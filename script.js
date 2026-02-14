// Filter functionality for rental developments
document.addEventListener('DOMContentLoaded', function() {
    const neighbourhoodFilter = document.getElementById('neighbourhood');
    const bedroomsFilter = document.getElementById('bedrooms');
    const rentFilter = document.getElementById('rent');
    const propertiesGrid = document.getElementById('propertiesGrid');
    const countElement = document.getElementById('count');
    const noResults = document.getElementById('noResults');
    
    // Add event listeners to all filters
    if (neighbourhoodFilter) {
        neighbourhoodFilter.addEventListener('change', filterProperties);
    }
    if (bedroomsFilter) {
        bedroomsFilter.addEventListener('change', filterProperties);
    }
    if (rentFilter) {
        rentFilter.addEventListener('change', filterProperties);
    }
    
    function filterProperties() {
        const neighbourhood = neighbourhoodFilter.value.toLowerCase();
        const bedrooms = bedroomsFilter.value;
        const rent = rentFilter.value;
        
        const propertyCards = propertiesGrid.getElementsByClassName('property-card');
        let visibleCount = 0;
        
        // Loop through all property cards
        Array.from(propertyCards).forEach(card => {
            let showCard = true;
            
            // Filter by neighbourhood
            if (neighbourhood && !card.dataset.neighbourhood.toLowerCase().includes(neighbourhood)) {
                showCard = false;
            }
            
            // Filter by bedrooms
            if (bedrooms) {
                const cardBedrooms = parseInt(card.dataset.bedrooms);
                const filterBedrooms = parseInt(bedrooms);
                
                if (filterBedrooms === 0 && cardBedrooms !== 0) {
                    showCard = false;
                } else if (filterBedrooms === 3 && cardBedrooms < 3) {
                    showCard = false;
                } else if (filterBedrooms > 0 && filterBedrooms < 3 && cardBedrooms !== filterBedrooms) {
                    showCard = false;
                }
            }
            
            // Filter by rent
            if (rent) {
                const [minRent, maxRent] = rent.split('-').map(Number);
                const cardMinRent = parseInt(card.dataset.minRent);
                const cardMaxRent = parseInt(card.dataset.maxRent);
                
                // Check if there's any overlap in the rent ranges
                if (cardMaxRent < minRent || cardMinRent > maxRent) {
                    showCard = false;
                }
            }
            
            // Show or hide the card
            if (showCard) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update count
        countElement.textContent = visibleCount;
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            propertiesGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            propertiesGrid.style.display = 'grid';
        }
    }
});

// Reset filters function
function resetFilters() {
    document.getElementById('neighbourhood').value = '';
    document.getElementById('bedrooms').value = '';
    document.getElementById('rent').value = '';
    
    // Show all properties
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Update count
    document.getElementById('count').textContent = propertyCards.length;
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('propertiesGrid').style.display = 'grid';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
