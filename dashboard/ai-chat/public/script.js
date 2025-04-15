async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput === "") return;

    const inputField = document.getElementById("userInput");
    const sendButton = document.querySelector("button");
    
    try {
        // Disable controls
        inputField.disabled = true;
        sendButton.disabled = true;

        // Display user's message
        appendMessage(userInput, 'user-message');
        inputField.value = "";

        // Show loading animation
        const loadingDiv = appendMessage('', 'bot-message loading-message');
        const loadingText = document.createElement('span');
        loadingText.innerText = 'Thinking';
        const dots = document.createElement('span');
        dots.innerText = '...';
        loadingDiv.appendChild(loadingText);
        loadingDiv.appendChild(dots);
        
        console.log('Sending message:', userInput);
        
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Raw response:', responseData);

        try {
            // Remove loading message
            loadingDiv.remove();

            // Create and append bot message
            const botMessageDiv = appendMessage('', 'bot-message');
            
            // Use pre element to preserve formatting
            const preElement = document.createElement('pre');
            botMessageDiv.appendChild(preElement);
            
            // Display the response message
            await typeMessage(preElement, responseData.response, 30);

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Error displaying response');
        }

    } catch (error) {
        console.error("Error details:", error);
        const errorDiv = appendMessage('Connection error. Please try again.', 'bot-message error-message');
        errorDiv.innerHTML += '<br><small>Click to dismiss</small>';
        errorDiv.onclick = () => errorDiv.remove();
    } finally {
        inputField.disabled = false;
        sendButton.disabled = false;
        inputField.focus();
    }
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    const classes = className.split(' ');
    messageDiv.classList.add('message', ...classes);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function typeMessage(element, text, speed = 30) {
    // Split text into individual lines
    const lines = text.split('\n');
    let lineIndex = 0;
    element.textContent = '';
    
    return new Promise(resolve => {
        function typeLine() {
            if (lineIndex < lines.length) {
                // Add the current line
                if (lines[lineIndex].trim() !== '') {  // Only add non-empty lines
                    element.textContent += lines[lineIndex] + '\n';
                }
                lineIndex++;
                
                // Scroll to the bottom after each line
                const chatBox = document.getElementById("chatBox");
                chatBox.scrollTop = chatBox.scrollHeight;
                
                setTimeout(typeLine, speed);
            } else {
                resolve();
            }
        }
        typeLine();
    });
}
