function goBack() {
        // Try multiple methods to go back
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback: close the window or redirect to a default page
            window.close();
            // If window.close() doesn't work, redirect to parent directory
            setTimeout(() => {
                window.location.href = '../';
            }, 100);
        }
    }

    function toggleAction(actionId, headerElement) {
        const actionContent = document.getElementById(actionId)
        const toggleIcon = headerElement.querySelector('.toggle-icon')
        
        if (!actionContent || !toggleIcon) return
        
        const isHidden = actionContent.classList.contains('hidden')
        
        if (isHidden) {
            // Show
            actionContent.classList.remove('hidden')
            toggleIcon.style.transform = 'rotate(180deg)'
        } else {
            // Hide
            actionContent.classList.add('hidden')
            toggleIcon.style.transform = 'rotate(0deg)'
        }
    }

    // Initialize all sections as collapsed
    document.addEventListener('DOMContentLoaded', function() {
        const allActionContents = document.querySelectorAll('[id$="-action"]')
        allActionContents.forEach(content => {
            content.classList.add('hidden')
        })
        
        const allToggleIcons = document.querySelectorAll('.toggle-icon')
        allToggleIcons.forEach(icon => {
            icon.style.transform = 'rotate(0deg)'
            icon.style.transition = 'transform 0.3s ease'
        })
    })