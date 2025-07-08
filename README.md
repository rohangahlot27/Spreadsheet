# 🧾 React Spreadsheet App – Intern Assignment (Inscripts)

A fully interactive, spreadsheet-style web app built using **React 18**, **TypeScript**, **Tailwind CSS**, and **TanStack Table v8** — inspired by tools like Google Sheets and Airtable.

This assignment was completed as part of the **React Intern Assignment** for **Inscripts**, matching the provided Figma design and functionality expectations.

> 🔗 **Live Demo**: [https://spreadsheet-sepia.vercel.app](https://spreadsheet-sepia.vercel.app)  
> 📁 **GitHub Repository**: [https://github.com/rohangahlot27/Spreadsheet](https://github.com/rohangahlot27/Spreadsheet)

---

## 🔧 Tech Stack

- ⚛️ React 18
- 🟦 TypeScript (strict mode)
- 🌈 Tailwind CSS
- 🧩 TanStack Table v8 (`@tanstack/react-table`)
- ⚡ Vite
- 🖼️ SVG + Material Icons

---

## ✨ Features

- ✅ **Figma-perfect layout** including:
  - Top bar with breadcrumbs, profile, search, notifications
  - Secondary toolbar (Hide Fields, Sort, Filter, Cell View)
  - Tabs: All Orders, Pending, Reviewed, Arrived
- ✅ **Editable spreadsheet cells**
  - Text, Date, Select, Checkbox, Number
- ✅ **Keyboard navigation**
  - Arrow keys for moving across cells
- ✅ **Add/Delete Rows**
- ✅ **Add/Delete Columns**
  - Column types prompted dynamically
- ✅ **Resizable Columns**
  - Native drag-to-resize with TanStack
- ✅ **Grouped column headers**
  - `Financial Overview`, `ABC`, `Answer a Question`, `Extract`
- ✅ **Responsive UI**, consistent with modern tools
- ✅ **LocalStorage persistence** for table data and custom columns

---

## 📁 Folder Structure

 ```Spreadsheet/
├── public/
├── src/
│   ├── assets/                   
│   ├── components/
│   │   ├── Table.tsx
│   │   ├── TopBar.tsx
│   │   ├── SecondaryToolbar.tsx
│   │   └── TitleTabs.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .gitignore
├── index.html
├── README.md
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── package-lock.json

👤 Author
Developed by Rohan Gahlot


