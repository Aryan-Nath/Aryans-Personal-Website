document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".background-grid");
    const totalBlocks = 24;
    
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        
        const colSpan = Math.random() > 0.7 ? 2 : 1; 
        const rowSpan = Math.random() > 0.7 ? 2 : 1;
        
        block.style.gridColumn = `span ${colSpan}`;
        block.style.gridRow = `span ${rowSpan}`;
        
        grid.appendChild(block);
    }
});