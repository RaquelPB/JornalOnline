// Animação de digitação para o H1 com id "cursor-animation"
    (function initTyping() {
        const heading = document.getElementById('cursor-animation');
        if (!heading) return;

        const fullText = heading.textContent.trim();
        heading.textContent = ''; // limpa o texto para começar a "digitar"

        // detecta se é mobile
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // cria o elemento cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        heading.appendChild(cursor);

        // injeta CSS necessário (apenas uma vez)
        if (!document.getElementById('typing-style')) {
            const style = document.createElement('style');
            style.id = 'typing-style';
            style.textContent = `
                #cursor-animation { 
                    white-space: nowrap; 
                    overflow: hidden; 
                    display: inline-block; 
                }
                #cursor-animation .typing-cursor { 
                    display: inline-block; 
                    margin-left: 6px; 
                    font-weight: 700; 
                }
                @keyframes typing-blink { 
                    50% { opacity: 0; } 
                }
                .typing-cursor { 
                    animation: typing-blink 1s steps(2,end) infinite; 
                }
                
                /* Mobile: cursor mais próximo */
                @media (max-width: 768px) {
                    #cursor-animation .typing-cursor { 
                        margin-left: 2px; 
                    }
                }
                
                @media (max-width: 480px) {
                    #cursor-animation .typing-cursor { 
                        margin-left: 1px; 
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // função de digitação
        let i = 0;
        const speed = 80; // ms por caractere
        function typeNext() {
            if (i < fullText.length) {
                // insere o próximo caractere antes do cursor
                cursor.insertAdjacentText('beforebegin', fullText.charAt(i));
                i++;
                setTimeout(typeNext, speed);
            } else {
                // após concluir a digitação
                if (isMobile) {
                    // Mobile: remove o cursor imediatamente
                    if (cursor && cursor.parentNode) {
                        cursor.remove();
                    }
                } else {
                    // Desktop: deixa piscar por 2s e depois remove
                    const blinkDurationMs = 2000;
                    setTimeout(() => {
                        if (cursor && cursor.parentNode) cursor.remove();
                    }, blinkDurationMs);
                }
            }
        }

        // pequeno atraso antes de iniciar a digitação
        setTimeout(typeNext, 500);
    })()

