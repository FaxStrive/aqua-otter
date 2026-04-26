from playwright.sync_api import sync_playwright
import os

# Corrected URLs based on actual route structure
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

def capture_sections(slug, url, viewport_width=375, viewport_height=812):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': viewport_width, 'height': viewport_height})
        page.goto(url, wait_until='networkidle', timeout=30000)
        page.wait_for_timeout(1500)

        # ATF shot
        page.screenshot(path=os.path.join(output_dir, f"s_{slug}_atf.png"), full_page=False)

        # Scroll to 812px (second screen)
        page.evaluate("window.scrollTo(0, 812)")
        page.wait_for_timeout(400)
        page.screenshot(path=os.path.join(output_dir, f"s_{slug}_scroll1.png"), full_page=False)

        # Scroll to 1624px (third screen)
        page.evaluate("window.scrollTo(0, 1624)")
        page.wait_for_timeout(400)
        page.screenshot(path=os.path.join(output_dir, f"s_{slug}_scroll2.png"), full_page=False)

        browser.close()
        print(f"Done: {slug}")

for slug, url in pages:
    try:
        capture_sections(slug, url)
    except Exception as e:
        print(f"ERROR on {url}: {e}")
