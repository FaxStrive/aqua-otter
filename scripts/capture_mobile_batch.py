from playwright.sync_api import sync_playwright
import os

pages = [
    ("water_softener", "http://localhost:3111/systems/water-softener"),
    ("well_water", "http://localhost:3111/systems/well-water"),
    ("reverse_osmosis", "http://localhost:3111/systems/reverse-osmosis"),
    ("uv_purification", "http://localhost:3111/systems/uv-purification"),
    ("homepage", "http://localhost:3111/"),
]

output_dir = "/Users/ezekiel/Desktop/WEBMASTUI/aqua-otter/aqua-otter-main/screenshots/mobile"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url in pages:
        page = browser.new_page(viewport={"width": 375, "height": 812})
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(1500)
        out_path = f"{output_dir}/{name}.png"
        page.screenshot(path=out_path, full_page=True)
        print(f"Captured: {out_path}")
        page.close()
    browser.close()

print("Done.")
