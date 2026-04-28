from playwright.sync_api import sync_playwright
import os

pages = [
    ("water_softener", "http://localhost:3111/systems/water-softener"),
    ("well_water", "http://localhost:3111/systems/well-water"),
    ("reverse_osmosis", "http://localhost:3111/systems/reverse-osmosis"),
    ("uv_purification", "http://localhost:3111/systems/uv-purification"),
    ("homepage", "http://localhost:3111/"),
]

output_dir = "/Users/ezekiel/Desktop/WEBMASTUI/aqua-otter/aqua-otter-main/screenshots/mobile_segments"
os.makedirs(output_dir, exist_ok=True)

VIEWPORT_H = 812

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url in pages:
        page = browser.new_page(viewport={"width": 375, "height": VIEWPORT_H})
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(1500)

        # Get total page height
        total_height = page.evaluate("document.documentElement.scrollHeight")
        print(f"{name}: total height = {total_height}px")

        # Capture in 812px tall segments
        segment = 0
        scroll_y = 0
        while scroll_y < total_height:
            page.evaluate(f"window.scrollTo(0, {scroll_y})")
            page.wait_for_timeout(300)
            out_path = f"{output_dir}/{name}_seg{segment:02d}.png"
            page.screenshot(path=out_path, full_page=False)
            print(f"  Captured segment {segment}: scroll_y={scroll_y} -> {out_path}")
            segment += 1
            scroll_y += VIEWPORT_H

        page.close()
    browser.close()

print("Done.")
