#!/usr/bin/env python3
"""Turn the client's Drive photos into web-ready WebP files.

Usage: python3 scripts/process_media.py /path/to/raw-drive-folder

Every exported photo:
  * is auto-oriented and has ALL metadata stripped (phone photos carry GPS)
  * has the timestamp-camera overlay (which prints the job's street address)
    cropped off the bottom
  * is renamed by service + suburb, never by customer name
  * is written as WebP at two widths for srcset

Writes public/img/** and src/media.json (consumed by the site build).

The client's original file names contain customer first names, so the mapping from
output slug → source file lives in scripts/media-sources.local.json, which is
git-ignored and never published. See scripts/media-sources.example.json.
"""
import json
import os
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_FILE = os.path.join(ROOT, "scripts", "media-sources.local.json")
SRC = json.load(open(SRC_FILE)) if os.path.exists(SRC_FILE) else {}
OUT = os.path.join(ROOT, "public", "img")

# Timestamp-camera photos print date + street address in the bottom ~23%.
STAMP = (0, 0, 1, 0.75)

# ---------------------------------------------------------------- before/after
# crop: fractional box (x0, y0, x1, y1) applied to both images before fitting
# aspect. Suburbs come from the camera overlay on the original photo.
PAIRS = [
    dict(slug="dry-lawn-revival-watsonia",
         crop=(0, 0, 0.84, 0.75), aspect=(4, 3), service="lawn-care-programs", suburb="Watsonia",
         title="Dry front lawn & nature strip brought back to green",
         alt="front lawn and nature strip either side of a concrete path"),
    dict(slug="backyard-lawn-transformation-templestowe",
         crop=(0, 0, 1, 0.68), aspect=(4, 3), service="lawn-care-programs", suburb="Templestowe",
         title="Backyard lawn transformation",
         alt="narrow backyard lawn between a rendered retaining wall and a brick house"),
    dict(slug="nature-strip-renovation-templestowe",
         crop=(0, 0.36, 1, 0.75), crop_after=(0, 0.47, 1, 0.75), aspect=(16, 9), service="lawn-renovation", suburb="Templestowe",
         title="Nature strip renovation",
         alt="nature strip lawn beside a footpath"),
    dict(slug="dry-front-lawn-recovery-watsonia-north",
         crop=STAMP, aspect=(1, 1), service="lawn-renovation", suburb="Watsonia North",
         title="Dry front lawn recovery",
         alt="front lawn and nature strip along a curved concrete path"),
    dict(slug="commercial-grounds-tidy-up-doncaster",
         crop=STAMP, aspect=(4, 3), service="lawn-mowing", suburb="Doncaster",
         title="Commercial grounds tidy-up",
         alt="commercial property lawn bordered by a concrete driveway"),
    dict(slug="backyard-lawn-transformation-mill-park",
         crop=STAMP, aspect=(4, 3), service="lawn-care-programs", suburb="Mill Park",
         title="Backyard lawn transformation",
         alt="large backyard lawn with trees along the back fence"),
    dict(slug="front-lawn-garden-bed-refresh-watsonia-north",
         crop=STAMP, aspect=(4, 3), service="garden-maintenance-programs", suburb="Watsonia North",
         title="Front lawn & garden bed refresh",
         alt="corner front lawn with a native garden bed and rock edging"),
    dict(slug="front-lawn-makeover-briar-hill",
         crop=STAMP, aspect=(4, 3), service="lawn-care-programs", suburb="Briar Hill",
         title="Front lawn makeover",
         alt="front lawn of a weatherboard home beside a concrete driveway"),
    dict(slug="hedge-and-lawn-tidy-rosanna",
         crop=STAMP, aspect=(4, 3), service="gardening", suburb="Rosanna",
         title="Hedge trim & lawn tidy",
         alt="tall clipped hedge along a fence above a backyard lawn"),
    dict(slug="hedge-trimming-footpath-rosanna",
         crop=(0, 0.04, 0.62, 0.86), aspect=(3, 4), service="gardening", suburb="Rosanna",
         title="Overgrown hedge cut back off the footpath",
         alt="hedge growing over a front fence beside a footpath"),
    dict(slug="side-courtyard-lawn-doncaster-east",
         crop=STAMP, aspect=(1, 1), service="gardening", suburb="Doncaster East",
         title="Side courtyard lawn clean-up",
         alt="small courtyard lawn with a young tree beside a white fence"),
    dict(slug="backyard-lawn-edges-rosanna",
         crop=STAMP, aspect=(4, 3), service="lawn-mowing", suburb="Rosanna",
         title="Backyard mow, edge & tidy",
         alt="backyard lawn bordered by a gravel path and paved area"),
    dict(slug="under-stair-lawn-edging-rosanna",
         crop=STAMP, aspect=(4, 3), service="lawn-mowing", suburb="Rosanna",
         title="Lawn edging under the back stairs",
         alt="lawn edge and garden bed beneath white timber stairs"),
    dict(slug="nature-strip-mow-rosanna",
         crop=(0, 0.12, 1, 0.78), aspect=(1, 1), service="lawn-mowing", suburb="Rosanna",
         title="Nature strip mow & edge",
         alt="long nature strip between the footpath and the kerb"),
    # Added 26 Nov at the client's request (photos in the Drive "Before & After" folder).
    # Watsonia: house number in the top-right corner is cropped off.
    dict(slug="garden-bed-tidy-up-watsonia", crop=(0, 0.12, 1, 1), aspect=(4, 3), service="gardening", suburb="Watsonia",
         title="Front garden bed weeded, planted & mulched",
         alt="front garden bed along a weatherboard house, edged with brick"),
    dict(slug="side-garden-tidy-up-macleod", crop=(0, 0, 1, 1), aspect=(3, 4), tall=True, service="gardening", suburb="Macleod",
         title="Overgrown side garden cleared",
         alt="narrow side garden between a timber house and a fence, under a camellia"),
    dict(slug="side-path-tidy-up-macleod", crop=(0, 0, 1, 1), aspect=(3, 4), tall=True, service="gardening", suburb="Macleod",
         title="Side path cleared of weeds and overgrowth",
         alt="concrete side path between a fence and a shed"),
    # Added 27 Nov from the client's updated "Before After" folder.
    dict(slug="magnolia-screen-pruning-watsonia", crop=(0.08, 0, 1, 1), aspect=(4, 3), service="gardening", suburb="Watsonia",
         title="Overgrown magnolia screen pruned back into shape",
         alt="row of magnolias along a timber fence beside a small lawn"),
    dict(slug="side-passage-tidy-up", crop=(0, 0, 1, 1), aspect=(3, 4), tall=True, service="gardening", suburb="North east Melbourne",
         title="Overgrown side passage cleared",
         alt="narrow side passage between a brick wall and a brick house"),
    dict(slug="front-lawn-and-garden-rosanna",
         crop=STAMP, aspect=(4, 3), service="garden-maintenance-programs", suburb="Rosanna",
         title="Front lawn & native garden upkeep",
         alt="front lawn with clumping native grasses along the garden bed"),
]

# --------------------------------------------------------------------- gallery
# cat: lawn-programs | lawn-renovation | mowing | hedging | garden | mulching | commercial
G = lambda slug, cat, alt, crop=STAMP, **kw: dict(slug=slug, cat=cat, alt=alt, crop=crop, **kw)
GALLERY = [
    G("freshly-striped-front-lawn-mowing", "mowing",
      "Freshly mown front lawn with straight mowing stripes and crisp driveway edges", crop=(0, 0, 1, 1)),
    G("front-lawn-mowing-stripes-in-progress", "mowing",
      "Mowersaurus team mowing stripes into a front lawn beside a rose garden", crop=(0, 0, 1, 1)),
    G("front-lawn-mow-and-edge-in-progress", "mowing",
      "Front lawn being mowed and edged along a concrete path", crop=(0, 0, 1, 1)),
    G("corner-front-lawn-mowing", "mowing",
      "Corner front lawn mid-mow with rose bushes along the garden bed", crop=(0, 0, 1, 1)),
    G("lush-front-lawn-great-lawn-program", "lawn-programs",
      "Lush, evenly green front lawn after a Great Lawn Program visit", crop=(0, 0, 1, 1)),
    G("dense-healthy-lawn-beside-stone-wall", "lawn-programs",
      "Dense, healthy lawn running along a stone retaining wall and lavender bed", crop=(0, 0, 1, 1)),
    G("sloping-lawn-with-stepping-stones", "lawn-programs",
      "Bright green sloping lawn with stepping stones along a garden bed", crop=(0, 0, 1, 1)),
    G("side-lawn-with-brick-path", "lawn-programs",
      "Side lawn mown and edged alongside a red brick path", crop=(0, 0, 1, 1)),
    G("backyard-lawn-with-brick-paving", "lawn-programs",
      "Backyard lawn edged neatly against curved brick paving", crop=(0, 0, 1, 1)),
    G("front-lawn-maintenance-north-east-melbourne", "lawn-programs",
      "Even front lawn with tidy edges along the footpath", crop=(0, 0, 1, 1)),
    G("lawn-edge-along-timber-fence", "lawn-programs",
      "Lawn mown and edged along a timber fence and concrete path", crop=(0, 0, 1, 1)),
    G("lawn-and-garden-beds-rock-wall", "garden",
      "Curved lawn below a rock wall with established garden beds", crop=(0, 0, 1, 1)),
    G("garden-bed-edge-and-lawn", "garden",
      "Lawn edge running beside a well-kept native garden bed", crop=(0, 0, 1, 1)),
    G("brick-path-garden-lawn", "garden",
      "Misty morning lawn and garden either side of a red brick path", crop=(0, 0, 1, 1)),
    G("brick-path-garden-maintenance-eltham", "garden",
      "Lawn and garden beds along a brick path in Eltham", suburb="Eltham"),
    G("front-lawn-and-clipped-hedge", "hedging",
      "Front lawn in front of a tall, square-clipped hedge", crop=(0, 0, 1, 1)),
    G("mulched-garden-beds-front-lawn-rosanna", "mulching",
      "Freshly mulched garden beds with steel edging around a front lawn in Rosanna", suburb="Rosanna"),
    G("mulched-bed-and-curved-lawn-edge-rosanna", "mulching",
      "Curved lawn edge against a dark mulched garden bed in Rosanna", suburb="Rosanna"),
    G("native-garden-bed-and-lawn-watsonia-north", "garden",
      "Native garden bed with rocks and a freshly mown front lawn in Watsonia North",
      crop=(0, 0, 0.66, 0.75), suburb="Watsonia North"),
    G("nature-strip-mowing-eltham", "mowing",
      "Nature strip mown and edged along a sloping street in Eltham", crop=(0, 0, 1, 1), suburb="Eltham"),
    G("crisp-lawn-boundary-lines", "mowing",
      "Crisp lawn boundary lines along a driveway and white picket fence", crop=(0, 0, 1, 0.8)),
    G("lawn-renovation-scalping-front-yard", "lawn-renovation",
      "Front lawn scalped low as the first stage of a lawn renovation", crop=(0, 0, 1, 1)),
    G("scalped-lawn-ready-for-renovation", "lawn-renovation",
      "Front lawn scalped and cleaned up, ready for coring and topdressing", crop=(0, 0, 1, 1)),
    G("dethatching-backyard-lawn-renovation", "lawn-renovation",
      "Dethatching a backyard lawn during a full lawn renovation", crop=(0, 0, 1, 1)),
    G("lawn-renovation-dethatch-passes", "lawn-renovation",
      "Dethatcher passes across a backyard lawn mid-renovation", crop=(0, 0, 1, 1)),
    G("lawn-after-dethatch-renovation", "lawn-renovation",
      "Backyard lawn opened up after dethatching, before topdressing", crop=(0, 0, 1, 1)),
    G("backyard-lawn-renovation-aeration", "lawn-renovation",
      "Long backyard lawn being worked over during a renovation", crop=(0, 0.04, 1, 0.82)),
    G("nature-strip-renovation-dethatched", "lawn-renovation",
      "Nature strip lawn freshly dethatched as part of a renovation", crop=(0, 0, 1, 1)),
    G("commercial-lawn-maintenance-doncaster", "commercial",
      "Commercial property lawn maintained beside a concrete driveway in Doncaster", suburb="Doncaster"),
    G("lawn-edging-under-stairs-rosanna", "mowing",
      "Lawn trimmed neatly under timber stairs in Rosanna", suburb="Rosanna"),
]

GALLERY += [
    # Added 26 Nov at the client's request. Overlays with street addresses are cropped off;
    # a mailbox number and a number plate are blurred (fractions of the ORIGINAL image).
    G("native-garden-maintenance-yallambie", "garden",
      "Established native front garden with clipped shrubs, rocks and fresh mulch, maintained in Yallambie",
      crop=(0, 0, 0.93, 0.77), blur=[(0.73, 0.39, 0.77, 0.45)], suburb="Yallambie"),
    G("native-garden-driveway-yallambie", "garden",
      "Native grasses and mulched beds beside a driveway, maintained in Yallambie",
      crop=(0, 0, 1, 0.77), suburb="Yallambie"),
    G("topdressing-completed-south-morang", "lawn-renovation",
      "Backyard lawn freshly topdressed with sand after a renovation in South Morang",
      crop=(0, 0, 1, 0.75), suburb="South Morang"),
    G("mulched-beds-exposed-aggregate-path", "mulching",
      "Freshly mulched garden beds curving around an exposed-aggregate path",
      crop=(0, 0, 1, 1), blur=[(0.93, 0.385, 0.985, 0.425)]),
    G("lomandra-pruning-garden-beds", "garden",
      "Lomandras and native beds pruned and shaped along a curved gabion wall",
      crop=(0, 0, 1, 1)),
    G("side-passage-tidy-up-in-progress", "garden",
      "Side passage part way through a garden tidy-up, weeds cut and ferns trimmed",
      crop=(0, 0, 1, 1)),
    G("garden-bed-tidy-up-watsonia-after", "garden",
      "Front garden bed weeded, planted and mulched after a garden tidy-up in Watsonia",
      crop=(0.12, 0.12, 1, 1), suburb="Watsonia"),  # exact 4:3 so the card keeps the client's watermark whole
]

HERO = dict(slug="hero-striped-front-lawn",
            alt="Freshly mown and striped front lawn with crisp edges after a Great Lawn Program visit")


def load(raw, name):
    im = Image.open(os.path.join(raw, name))
    im = ImageOps.exif_transpose(im)
    return im.convert("RGB")


def crop_frac(im, box):
    w, h = im.size
    x0, y0, x1, y1 = box
    return im.crop((round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h)))


def fit_aspect(im, aspect, focus_y=0.5):
    w, h = im.size
    aw, ah = aspect
    if w / h > aw / ah:  # too wide
        nw = round(h * aw / ah)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w * ah / aw)
    y = round((h - nh) * focus_y)
    return im.crop((0, y, w, y + nh))


def blur_boxes(im, boxes):
    """Blur fractional boxes (x0, y0, x1, y1) of the image: number plates, house numbers."""
    from PIL import ImageFilter
    w, h = im.size
    for x0, y0, x1, y1 in boxes or ():
        box = (round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h))
        region = im.crop(box).filter(ImageFilter.GaussianBlur(max(6, (box[2] - box[0]) // 6)))
        im.paste(region, box)
    return im


def have(raw, key, *fields):
    """True if every source file for this slug exists in raw/ (sources can be added later)."""
    src = SRC.get(key)
    return bool(src) and all(os.path.exists(os.path.join(raw, src[f])) for f in fields)


def save_webp(im, path_noext, widths, q=52):
    out = []
    for w in widths:
        w = min(w, im.width)
        if any(o["w"] == w for o in out):
            continue
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        p = f"{path_noext}-{w}.webp"
        r.save(p, "WEBP", quality=q, method=6)  # no exif= → metadata stripped
        out.append(dict(w=w, h=r.height, src="/" + os.path.relpath(p, os.path.join(ROOT, "public")).replace(os.sep, "/")))
    return out


def main(raw):
    """Incremental: entries whose source files are present in raw/ are (re)built and merged
    into src/media.json; everything else keeps its existing export and record."""
    for d in ("ba", "work", "brand"):
        os.makedirs(os.path.join(OUT, d), exist_ok=True)
    mpath = os.path.join(ROOT, "src", "media.json")
    media = json.load(open(mpath)) if os.path.exists(mpath) else dict(pairs=[], gallery=[], hero=None)
    by_slug = lambda lst: {r["slug"]: r for r in lst}
    pairs, gallery = by_slug(media["pairs"]), by_slug(media["gallery"])
    skipped = []

    for p in PAIRS:
        if not have(raw, p["slug"], "before", "after"):
            skipped.append(p["slug"]); continue
        b = fit_aspect(crop_frac(load(raw, SRC[p["slug"]]["before"]), p["crop"]), p["aspect"])
        a = fit_aspect(crop_frac(load(raw, SRC[p["slug"]]["after"]), p.get("crop_after", p["crop"])), p["aspect"])
        rec = {k: v for k, v in p.items() if k not in ("crop", "crop_after")}
        rec["aspect"] = list(p["aspect"])
        rec["before_img"] = save_webp(b, os.path.join(OUT, "ba", p["slug"] + "-before"), (960, 640, 420))
        rec["after_img"] = save_webp(a, os.path.join(OUT, "ba", p["slug"] + "-after"), (960, 640, 420))
        pairs[p["slug"]] = rec
        print("pair", p["slug"])

    for g in GALLERY:
        if not have(raw, g["slug"], "file"):
            skipped.append(g["slug"]); continue
        im = blur_boxes(load(raw, SRC[g["slug"]]["file"]), g.get("blur"))
        im = crop_frac(im, g["crop"])
        if im.width > im.height * 1.5:
            im = fit_aspect(im, (3, 2))
        rec = {k: v for k, v in g.items() if k not in ("crop", "blur")}
        rec["img"] = save_webp(im, os.path.join(OUT, "work", g["slug"]), (1200, 720, 420))
        gallery[g["slug"]] = rec
        print("gallery", g["slug"])

    if have(raw, HERO["slug"], "file"):
        im = fit_aspect(load(raw, SRC[HERO["slug"]]["file"]), (16, 9), focus_y=0.62)
        media["hero"] = dict(alt=HERO["alt"], img=save_webp(im, os.path.join(OUT, "work", HERO["slug"]), (1920, 1600, 1200, 800), q=50))

    # keep definition order
    media["pairs"] = [pairs[p["slug"]] for p in PAIRS if p["slug"] in pairs]
    media["gallery"] = [gallery[g["slug"]] for g in GALLERY if g["slug"] in gallery]
    json.dump(media, open(mpath, "w"), indent=1)
    if have(raw, "_logo_light", "file") and have(raw, "_logo_dark", "file"):
        brand(raw)
    if skipped:
        print(f"kept existing exports for {len(skipped)} entries whose sources aren't in {raw}")


def brand(raw):
    """Logo files are used as supplied: trimmed and resized only, never recoloured."""
    b = os.path.join(OUT, "brand")
    light = Image.open(os.path.join(raw, SRC["_logo_light"]["file"])).convert("RGB")
    light = light.crop((240, 230, 687, 554))  # trim surplus white canvas
    light.save(os.path.join(b, "logo-on-white.webp"), "WEBP", quality=92, method=6)
    light.save(os.path.join(b, "logo-on-white.png"), optimize=True)

    dark = Image.open(os.path.join(raw, SRC["_logo_dark"]["file"])).convert("RGBA")
    dark = dark.crop(dark.getbbox())
    dark.save(os.path.join(b, "logo-on-dark.webp"), "WEBP", quality=92, method=6)
    dark.save(os.path.join(b, "logo-on-dark.png"), optimize=True)

    # Favicon / app icon: the logo's own dino head, cropped (not redrawn).
    head = Image.new("RGB", (172, 172), "white")
    head.paste(light.crop((238, 0, 404, 160)), (3, 10))
    for s in (32, 180, 192, 512):
        head.resize((s, s), Image.LANCZOS).save(os.path.join(b, f"icon-{s}.png"), optimize=True)
    head.resize((48, 48), Image.LANCZOS).save(os.path.join(ROOT, "public", "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])

    # Social share image: logo centred on white, 1200x630.
    og = Image.new("RGB", (1200, 630), "white")
    lg = light.resize((round(light.width * 560 / light.height), 560), Image.LANCZOS)
    og.paste(lg, ((1200 - lg.width) // 2, 35))
    og.save(os.path.join(b, "og-image.jpg"), quality=86)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/home/user/media/raw")
