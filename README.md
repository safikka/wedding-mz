# Wedding Mahdy & Zahro

This project is a simple static website for our wedding that displays a personalized invitation based on a query parameter for the recipient's name.

## Features
- Displays a personalized invitation using the `name` query parameter (e.g., `?name=John`).
- Smooth scrolling with Lenis.
- Animations powered by GSAP.
- Responsive design styled with Tailwind CSS.

## Dependencies (via CDN)
- **GSAP**: For animations and transitions (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`).
- **Lenis**: For smooth scrolling (`https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled.js`).
- **Tailwind CSS**: For styling and responsive design (`https://cdn.tailwindcss.com`).

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Serve the Website**:
   Use the **Live Preview** extension by Microsoft in Visual Studio Code:
   - Install the **Live Preview** extension by Microsoft from the VS Code Extensions Marketplace.
   - Open the project folder in VS Code.
   - Right-click on `index.html` and select **Show Preview**, or use the **Live Preview: Start Server** command from the VS Code Command Palette (Ctrl+Shift+P).
   - This will launch a local server (typically at `http://localhost:3000`).

   Alternatively, open `index.html` directly in a browser (note: some CDNs may require a server due to CORS).

3. **Access the Invitation**:
   Open the website in a browser and append the `name` query parameter to the URL, e.g.:
   ```
   http://localhost:3000/?name=John
   ```

## Project Structure
```
├── index.html          # Main HTML file with CDN links
├── css/
│   └── styles.css      # Custom CSS (if needed beyond Tailwind)
├── js/
│   └── main.js         # JavaScript for GSAP and Lenis
└── README.md           # Project documentation
```

## Usage
- The website reads the `name` query parameter from the URL and displays it in the invitation.
- Example: `http://localhost:3000/?name=Alice` will display an invitation addressed to "Alice".
- GSAP animations enhance the visual experience (e.g., fade-in effects for text).
- Lenis ensures smooth scrolling for a polished user experience.

## Development
- **Tailwind CSS**: Use the CDN in `index.html`. Add custom styles in `css/styles.css` if needed.
- **GSAP**: Add animations in `js/main.js` using GSAP's API.
- **Lenis**: Configure smooth scrolling in `js/main.js`.

## Deployment
To deploy the website:
1. Copy the contents of the project folder to your web server or hosting platform (e.g., Netlify, Vercel, or GitHub Pages).
2. Ensure the CDN URLs are accessible in your deployment environment.

## License
This project is licensed under the MIT License.

