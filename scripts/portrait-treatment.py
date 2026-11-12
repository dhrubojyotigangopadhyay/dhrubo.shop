import sys
from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageChops
import numpy as np
from rembg import remove, new_session
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
cut = remove(im, session=new_session("isnet-general-use"))
a = cut.split()[3].filter(ImageFilter.GaussianBlur(0.8))
# cinematic grade: desaturate toward warm monochrome, deepen shadows (identity untouched: tone only)
g = ImageOps.grayscale(im)
g = ImageEnhance.Contrast(g).enhance(1.28)
arr = np.asarray(g).astype(np.float32) / 255.0
arr = np.clip(arr, 0, 1) ** 1.25
# split tone: shadows cool-black, highlights warm bone
r = arr * 0.93 + 0.02; gch = arr * 0.86 + 0.015; b = arr * 0.76 + 0.02
# keep 22% of original colour for skin life
orig = np.asarray(im).astype(np.float32) / 255.0
rgb = np.stack([r, gch, b], -1) * 0.78 + orig * 0.22 * (arr[..., None] * 0.9 + 0.1)
# red rim light from the right edge of the silhouette
al = np.asarray(a).astype(np.float32) / 255.0
edge = np.asarray(a.filter(ImageFilter.GaussianBlur(14))).astype(np.float32) / 255.0
rim = np.clip(al - edge, 0, 1) * 2.2
h, w = al.shape
xg = np.linspace(0, 1, w)[None, :] ** 2.2
rim = rim * xg
rgb[..., 0] = np.clip(rgb[..., 0] + rim * 0.85, 0, 1)
rgb[..., 1] = np.clip(rgb[..., 1] + rim * 0.16, 0, 1)
rgb[..., 2] = np.clip(rgb[..., 2] + rim * 0.10, 0, 1)
# left side falls into shadow
fall = np.linspace(0.55, 1.0, w)[None, :, None] ** 0.9
rgb = rgb * fall
# fade the bottom into transparency
yfade = np.clip((1.0 - np.linspace(0, 1, h)) / 0.22, 0, 1)[:, None]
al = al * yfade
outim = Image.fromarray((np.dstack([rgb, al]) * 255).astype(np.uint8), "RGBA")
outim.save(out, "WEBP", quality=86, method=6)
outim.resize((480, 480), Image.LANCZOS).save(out.replace(".webp", "-480.webp"), "WEBP", quality=82, method=6)
bg = Image.new("RGB", outim.size, (10, 9, 8)); bg.paste(outim, mask=outim.split()[3]); bg.save("preview.png")
