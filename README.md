# Inventory Scanner

A web-based inventory management tool for scanning barcodes and managing product libraries.

## Features

- **Barcode Scanning**: Scan barcodes using your device's camera or manually enter barcode numbers
- **Product Library**: Manage a library of products with search functionality
- **Database Integration**: Search through 20,000+ products from an imported database
- **Order Forms**: Create and manage order forms
- **Local Storage**: All data is stored locally in your browser using IndexedDB and localStorage
- **Compact Design**: Optimized to fit on a single screen without scrolling

## Usage

1. Open `index.html` in a modern web browser
2. Use the barcode scanner to scan products or manually enter barcode numbers
3. Add products to your library for quick access
4. Search for products using the search box (type at least 2 characters)
5. Create order forms and export them as needed

## Files

- `index.html` - Main application file (all-in-one HTML, CSS, and JavaScript)
- `invoitem_all_data.js` - Embedded product database (20,000+ products)

## Browser Requirements

- Modern browser with camera access support
- JavaScript enabled
- Local storage enabled

## Notes

- All data is stored locally in your browser
- No server required - works offline after initial load
- Camera access is required for barcode scanning functionality
