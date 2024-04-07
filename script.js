document.addEventListener('DOMContentLoaded', function() {
  var messageInput = document.getElementById('message-input');
  var encryptionKeyInput = document.getElementById('encryption-key');
  var decryptionKeyInput = document.getElementById('decryption-key');
  
  messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      sendMessage();
    }
  });
});

function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var encryptionKeyInput = document.getElementById('encryption-key');
  var decryptionKeyInput = document.getElementById('decryption-key');
  
  var message = messageInput.value.trim();
  var key = encryptionKeyInput.value.trim();
  
  if (message !== '' && key !== '') {
    
    var encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();

    var chatBox = document.getElementById('chat-box');
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    var messageElement = document.createElement('div');
    messageElement.textContent = encryptedMessage; 
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
      chatBox.removeChild(messageContainer);
    };
    
    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(deleteButton);
    chatBox.appendChild(messageContainer);
    
    messageInput.value = '';
    encryptionKeyInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Function to decrypt a message
function decryptMessage() {
  var decryptionKeyInput = document.getElementById('decryption-key');
  var encryptedInput = document.getElementById('encrypted-input').value.trim();
  var key = decryptionKeyInput.value.trim();
  
  if (encryptedInput !== '' && key !== '') {
    var decryptedMessage = CryptoJS.AES.decrypt(encryptedInput, key).toString(CryptoJS.enc.Utf8);
    document.getElementById('decryption-output').textContent = decryptedMessage;
    
    // Clear the decryption key input after decryption
    decryptionKeyInput.value = '';
  }
}
