// Modern Brass Actions JavaScript

function toggleAction(actionId, headerElement) {
    const actionContent = document.getElementById(actionId)
    const toggleIcon = headerElement.querySelector('.toggle-icon')
    
    if (!actionContent || !toggleIcon) return
    
    const isCollapsed = headerElement.classList.contains('collapsed')
    
    if (isCollapsed) {
        // Expand
        actionContent.style.display = 'block'
        headerElement.classList.remove('collapsed')
        toggleIcon.style.transform = 'rotate(180deg)'
        
        // Add slide-down animation
        actionContent.style.maxHeight = '0'
        actionContent.style.opacity = '0'
        actionContent.style.overflow = 'hidden'
        actionContent.style.transition = 'all 0.3s ease-out'
        
        // Trigger animation
        setTimeout(() => {
            actionContent.style.maxHeight = '2000px'
            actionContent.style.opacity = '1'
        }, 10)
        
    } else {
        // Collapse
        actionContent.style.transition = 'all 0.3s ease-out'
        actionContent.style.maxHeight = '0'
        actionContent.style.opacity = '0'
        
        headerElement.classList.add('collapsed')
        toggleIcon.style.transform = 'rotate(0deg)'
        
        // Hide after animation
        setTimeout(() => {
            actionContent.style.display = 'none'
        }, 300)
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to collapse all sections
    if (e.key === 'Escape') {
        const allHeaders = document.querySelectorAll('.action-header')
        allHeaders.forEach(header => {
            if (!header.classList.contains('collapsed')) {
                const actionId = header.querySelector('.action-title span').textContent.toLowerCase().replace(' ', '-') + '-action'
                toggleAction(actionId, header)
            }
        })
    }
})

// Initialize all sections as collapsed
document.addEventListener('DOMContentLoaded', function() {
    const allActionContents = document.querySelectorAll('.action-content')
    allActionContents.forEach(content => {
        content.style.display = 'none'
    })
    
    const allToggleIcons = document.querySelectorAll('.toggle-icon')
    allToggleIcons.forEach(icon => {
        icon.style.transform = 'rotate(0deg)'
        icon.style.transition = 'transform 0.3s ease'
    })
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth'
})