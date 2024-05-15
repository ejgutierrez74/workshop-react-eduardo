import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import chatlogo from '../../assets/robot-chatbot-icon-sign-free-vector.jpg';
import { useState } from 'react';


     // Creating our own theme
     const theme = {
        background: '#C9FF8F',
        headerBgColor: '#197B22',
        headerFontSize: '20px',
        botBubbleColor: '#0F3789',
        headerFontColor: 'white',
        botFontColor: 'white',
        userBubbleColor: '#FF5733',
        userFontColor: 'white',
    };

    // Set some properties of the bot
    const config = {
        botAvatar: chatlogo,
        floating: true,
    };

   

export function ComponentChatBox() {

    const stepsInicial = [
        {
            id: '0',
            message: 'Hola amigo!',
    
            // This calls the next id
            // i.e. id 1 in this case
            trigger: '1',
        }, {
            id: '1',
    
            // This message appears in
            // the bot chat bubble
            message: 'Por favor hazme una pregunta e intentaré ayudarte.',
            trigger: '2'
        }, {
            id: '2',
    
            // Here we want the user
            // to enter input
            user: true,
            trigger: (userInput) => handleUserInput(userInput),
        },
    ];
    
    const [steps, setSteps] = useState(stepsInicial);
  //  const [id, setId] = useState('');

   
 

function handleUserInput(userInput) {
   
   
    if (userInput.value.length === 0) {
        console.log('No se ha introducido nada');
    }
    else {
        //Elimino la entrada con user a true
        steps.pop();
        let idActual= steps.length-1;
        
        // Aquí puedes manejar la entrada del usuario y agregarla a los pasos
        const questionUser = {
            id: `${idActual+ 1}`,
            message: userInput.value,
            trigger: `${idActual + 2}`,
        };

        const responseBot = {
            id: `${idActual + 2}`,
            message: 'Respuesta del bot',
            trigger: `${idActual + 3}`,
        };
        
        const nextStep = {
                id: `${idActual + 3}`,
                user: true,
                trigger: (userInput) => handleUserInput(userInput),
            };
        
        steps.push(questionUser, responseBot, nextStep);
        
      //  setId(`${idActual + 3}`);
        setSteps([steps]);

        //return `${idActual + 3}`;
        }
    }


    return (
        <div className="ComponentChatBox">
            <ThemeProvider theme={theme}>
                <ChatBot

                    // This appears as the header
                    // text for the chat bot
                    headerTitle="EduBot"
                    steps={steps}
                    {...config}
                />
                {console.log(steps)}
            </ThemeProvider>
        </div>
    );
}

export default ComponentChatBox;