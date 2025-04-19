# CSS Unit Converter

A modern, intuitive tool for web developers and designers to convert between different CSS units with ease.

![CSS Unit Converter Screenshot](public/screenshot.png)

## Project Overview

CSS Unit Converter is a web application built with Next.js, React, TypeScript, and TailwindCSS that allows users to convert between various CSS units (px, em, rem, %, vh, vw, etc.) and convert entire CSS code from one unit to another. The application features a clean, minimalist design with dark mode support and a responsive layout.

### Technologies Used

- **Next.js 14**: For server-side rendering and routing
- **React 18**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **TailwindCSS**: For styling
- **Shadcn/UI**: For UI components
- **Framer Motion**: For animations and transitions
- **Lucide React**: For icons

## Architecture

### Project Structure

\`\`\`
css-unit-converter/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── ... (shadcn/ui components)
│   ├── css-code-converter.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── theme-provider.tsx
│   └── unit-converter.tsx
├── public/
│   └── screenshot.png
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
\`\`\`

### State Management

The application uses React's built-in state management with hooks:

- `useState`: For managing local component state
- `useEffect`: For side effects like calculations and DOM updates
- `useTheme`: From next-themes for managing the theme

Data flows through the application in a top-down manner, with the main state being managed in the `UnitConverter` component and passed down to child components as needed.

### Dependencies

- **@radix-ui**: For accessible UI primitives
- **class-variance-authority**: For managing component variants
- **clsx** and **tailwind-merge**: For conditional class names
- **framer-motion**: For animations
- **lucide-react**: For icons
- **next-themes**: For theme management

## Features

### Unit Conversion

The core functionality of the application is to convert between different CSS units:

- **Input**: Users can enter a value and select the unit they want to convert from
- **Output**: The application displays the converted value in the selected target unit
- **Real-time Updates**: Conversions update instantly as the user types
- **Copy Button**: Users can copy the converted value with a single click

### CSS Code Conversion

The CSS Code Converter feature allows users to convert entire CSS code from one unit to another:

- **CSS Code Input**: Users can paste their CSS code with values in one unit
- **Unit Selection**: Users can select the source and target units
- **Result Preview**: The application displays the converted CSS code in real-time
- **Copy Button**: Users can copy the entire converted CSS code

### Theme Toggle

The application supports both light and dark modes:

- **Toggle Button**: Users can switch between light and dark modes with a single click
- **System Preference**: The application respects the user's system preference by default

### UI Design

The application features a clean, minimalist design:

- **Color Scheme**: Dark theme with #212121 background, #262626 input fields, and #000000 for code editors
- **Typography**: Geist for body text and Roboto Mono for code
- **Animations**: Smooth transitions between tabs and when elements mount/unmount
- **Responsive Design**: The application works well on all screen sizes

## Improvements and Adjustments

### Decimal Places

- Removed unnecessary decimal places (e.g., "2rem" instead of "2.00rem")
- Only shows decimal places when they are meaningful

### Simplified Interface

- Removed the Viewport Information container
- Displays only the selected target unit in the conversion results
- Removed the Root Font Size and Parent Element Size settings
- Added a cleaner, more focused layout

### Enhanced User Experience

- Added animations for tab transitions
- Improved the visual hierarchy with a clear header and footer
- Added an About modal with information about the application
- Improved the contrast and readability of the interface

## Future Enhancements

- **Syntax Highlighting**: Add syntax highlighting to the CSS code editor
- **Batch Conversion**: Allow converting between multiple units at once
- **Conversion History**: Save recent conversions for quick reference
- **Export Options**: Add options to export converted CSS as a file
- **Unit Explanation Tooltips**: Add tooltips explaining each CSS unit

## Installation and Usage

To run the project locally:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/css-unit-converter.git
   cd css-unit-converter
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
