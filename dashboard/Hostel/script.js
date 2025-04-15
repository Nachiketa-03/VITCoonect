// Modified blocksData structure with more detailed information
const blocksData = {
    'boys': {
        'A': {
            name: 'A-Block (Boys)',
            image: 'images/blocks/a-boys.jpg',
            description: 'Premium block with modern amenities and AC rooms',
            facilities: ['AC Rooms', 'Attached Bathroom', 'Study Table', 'WiFi', 'Power Backup'],
            rooms: {
                'Single Rooms': {
                    image: 'images/rooms/a-boys-1bed-room.jpg',
                    description: 'Premium single occupancy room with AC',
                    features: ['AC', 'Study Table', 'Wardrobe', 'WiFi'],
                    price: '₹80,000/semester'
                },
                'Double Rooms': {
                    image: 'images/rooms/a-boys-2bed-room.jpg',
                    description: 'Spacious double occupancy room',
                    features: ['AC', 'Attached Bathroom', '2 Study Tables', '2 Wardrobes'],
                    price: '₹65,000/semester'
                }
            }
        },
        'B': {
            name: 'B-Block (Boys)',
            image: 'blocks/b-block.jpg',
            description: 'Modern block with well-ventilated rooms',
            facilities: ['Common AC', 'Shared Bathroom', 'Study Areas', 'WiFi', 'Laundry'],
            rooms: {
                'Double Rooms': {
                    image: 'rooms/double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room',
                    features: ['Common AC', 'Shared Bathroom', '2 Study Tables', '2 Wardrobes', 'WiFi'],
                    price: '₹55,000/semester'
                }
            }
        },
        'C': {
            name: 'C-Block (Boys)',
            image: 'blocks/c-block.jpg',
            description: 'Comfortable block with spacious rooms',
            facilities: ['Common AC', 'Shared Bathroom', 'Study Areas', 'WiFi', 'Garden View'],
            rooms: {
                'Double Rooms': {
                    image: 'rooms/double-room-photo.jpg',
                    description: 'Comfortable double occupancy room',
                    features: ['Common AC', 'Shared Bathroom', '2 Study Tables', '2 Wardrobes', 'WiFi'],
                    price: '₹52,000/semester'
                },
                'Triple Rooms': {
                    image: 'rooms/triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room',
                    features: ['Common AC', 'Shared Bathroom', '3 Study Tables', '3 Wardrobes', 'WiFi'],
                    price: '₹45,000/semester'
                }
            }
        },
        'D': {
            name: 'D-Block (Boys)',
            image: 'd-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'E': {
            name: 'E-Block (Boys)',
            image: 'e-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'F': {
            name: 'F-Block (Boys)',
            image: 'f-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'G': {
            name: 'G-Block (Boys)',
            image: 'g-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'H': {
            name: 'H-Block (Boys)',
            image: 'h-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'I': {
            name: 'I-Block (Boys)',
            image: 'i-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'J': {
            name: 'I-Block (Boys)',
            image: 'j-block.jpg',
            description: 'Single and 4-bed rooms.',
            rooms: {
                'Single Rooms': {
                    image: 'single-room-photo.jpg',
                    description: 'Comfortable single occupancy room with attached study table and wardrobe'
                },
                '4-bed Rooms': {
                    image: '4-bed-room-photo.jpg',
                    description: 'Spacious 4-bed occupancy room with shared facilities'
                }
            }
        },
        'K': {
            name: 'K-Block (Boys)',
            image: 'k-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'L': {
            name: 'L-Block (Boys)',
            image: 'l-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'M': {
            name: 'M-Block (Boys)',
            image: 'm-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'N': {
            name: 'N-Block (Boys)',
            image: 'n-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'P': {
            name: 'P-Block (Boys)',
            image: 'p-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'Q': {
            name: 'Q-Block (Boys)',
            image: 'q-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'R': {
            name: 'R-Block (Boys)',
            image: 'r-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
    },
    'girls': {
        'A': {
            name: 'A-Block (Girls)',
            image: 'blocks/girls-a-block.jpg',
            description: 'Premium block with modern amenities',
            facilities: ['AC Rooms', 'Attached Bathroom', 'Study Areas', 'WiFi', 'Security'],
            rooms: {
                'Single Rooms': {
                    image: 'rooms/girls-single-room-photo.jpg',
                    description: 'Modern single occupancy room with attached bathroom'
                },
                'Double Rooms': {
                    image: 'rooms/girls-double-room-photo.jpg',
                    description: 'Comfortable double occupancy room with balcony'
                }
            }
        },
        'B': {
            name: 'B-Block (Girls)',
            image: 'b-block.jpg',
            description: 'Spacious double rooms with shared bathrooms.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                }
            }
        },
        'C': {
            name: 'C-Block (Girls)',
            image: 'c-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'D': {
            name: 'D-Block (Girls)',
            image: 'd-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'E': {
            name: 'E-Block (Girls)',
            image: 'e-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'F': {
            name: 'F-Block (Girls)',
            image: 'f-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'G': {
            name: 'G-Block (Girls)',
            image: 'g-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
        'H': {
            name: 'H-Block (Girls)',
            image: 'h-block.jpg',
            description: 'Double and triple rooms with large balconies.',
            rooms: {
                'Double Rooms': {
                    image: 'double-room-photo-girls.jpg',
                    description: 'Well-ventilated double occupancy room with shared facilities'
                },
                'Triple Rooms': {
                    image: 'triple-room-photo-girls.jpg',
                    description: 'Spacious triple occupancy room with shared facilities'
                }
            }
        },
    }
};

// Function to load hostel blocks into the side panel
function loadHostelBlocks(hostelType) {
    const sidePanel = document.getElementById('side-panel');
    sidePanel.innerHTML = `
        <h2>${capitalizeFirstLetter(hostelType)} Hostel Blocks</h2>
        <ul>
            ${Object.keys(blocksData[hostelType]).map(block => `
                <li><a href="#" onclick="showBlock('${hostelType}', '${block}')">${block}-Block</a></li>
            `).join('')}
        </ul>
    `;
}

// Updated showBlock function with more details
function showBlock(hostelType, block) {
    const blockDetails = blocksData[hostelType][block];
    const blockDetailsDiv = document.getElementById('block-details');

    blockDetailsDiv.innerHTML = `
        <div class="block-header">
            <h2>${blockDetails.name}</h2>
            <div class="facilities">
                ${blockDetails.facilities.map(facility => 
                    `<span class="facility-badge">${facility}</span>`
                ).join('')}
            </div>
        </div>
        <div class="block-image-container">
            <img src="${blockDetails.image}" alt="${blockDetails.name}" class="block-image">
        </div>
        <p class="block-description">${blockDetails.description}</p>
        <div class="rooms-grid">
            ${Object.entries(blockDetails.rooms).map(([roomType, details]) => `
                <div class="room-card" onclick="showRoom('${hostelType}', '${block}', '${roomType}')">
                    <img src="${details.image}" alt="${roomType}">
                    <h3>${roomType}</h3>
                    <p class="price">${details.price}</p>
                    <button class="view-details-btn">View Details</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Updated showRoom function without layout
function showRoom(hostelType, block, roomType) {
    const roomDetails = blocksData[hostelType][block].rooms[roomType];
    const blockDetailsDiv = document.getElementById('block-details');

    blockDetailsDiv.innerHTML += `
        <div class="room-details">
            <h3>${roomType}</h3>
            <div class="room-content">
                <div class="room-images">
                    <div class="image-container">
                        <h4>Room View</h4>
                        <img src="${roomDetails.image}" alt="${roomType} Photo" class="room-photo">
                    </div>
                </div>
                <div class="room-info">
                    <p class="room-description">${roomDetails.description}</p>
                    <div class="features-list">
                        ${roomDetails.features.map(feature => 
                            `<span class="feature-item">${feature}</span>`
                        ).join('')}
                    </div>
                    <div class="price-tag">
                        <span>Price:</span>
                        <strong>${roomDetails.price}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;

    const roomDetailsElement = blockDetailsDiv.querySelector('.room-details:last-child');
    roomDetailsElement.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize on page load
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hostelType = urlParams.get('type');
    if (hostelType) {
        loadHostelBlocks(hostelType);
    }
};
