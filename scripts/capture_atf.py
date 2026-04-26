from playwright.sync_api import sync_playwright
import os

pages = [
    ("homepage", "http://localhost:3555/"),
    ("water-softener", "http://localhost:3555/systems/water-softener"),
    ("case-studies", "http://localhost:3555/case-studies"),
    ("glossary", "http://localhost:3555/glossary"),
    ("learn", "http://localhost:3555/learn"),
    ("service-areas-indianapolis", "http://localhost:3555/service-areas/indianapolis-in"),
    ("contact", "http://localhost:3555/contact"),
]

output_dir = "/Users/ezekiel/Desktop/WEBMASTUI/aqua-otter/aqua-otter-main/screenshots"

def capture_atf(url, output_path, viewport_width=375, viewport_height=812):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': viewport_width, 'height': viewport_height})
        page.goto(url, wait_until='networkidle', timeout=30000)
        page.wait_for_timeout(1500)
        # above-the-fold only (full_page=False)
        page.screenshot(path=output_path, full_page=False)
        browser.close()
        print(f"Saved ATF: {output_path}")

for slug, url in pages:
    out = os.path.join(output_dir, f"atf_{slug}.png")
    try:
        capture_atf(url, out)
    except Exception as e:
        print(f"ERROR on {url}: {e}")
