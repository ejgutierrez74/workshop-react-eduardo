// default options provided to the bot
import botAvatar from "../assets/robot-chatbot-icon.jpg";
import userAvatar from "../assets/chatboticons/drslump-suppaman-superman-sentinel.jpg"
import chatButton from "../assets/chatboticons/chat_button.png";
import fileAttachmentIcon from "../assets/chatboticons/file_attachment_icon.svg";
import emojiIcon from "../assets/chatboticons/emoji_icon.svg";

const myBotOptions = {
	// tracks state of chat window, also the default state to load it in
	isOpen: false,

	// configurations
	theme: {
		primaryColor: "#42b0c5", //default is #42b0c5
		secondaryColor: "#fe7827",//default is #491d8d
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
			"'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
			"sans-serif",
		showHeader: true,
		showFooter: true,
		showInputRow: true,
	//	actionDisabledIcon: actionDisabledIcon,
		embedded: false,
		desktopEnabled: true,
		mobileEnabled: true,
	},
	tooltip: {
        //ALWAYS:Tooltip is always shown, CLOSE: Tooltip is shown when chat window is closed, START: Tooltip is shown once on page load, NEVER: Tooltip is never shown
		mode: "START",
		text: "Need help ? 😊", //The text to be displayed in the tooltip.
	},
	chatButton: {
		//icon: chatIcon,
	},
	header: {
		title: (
			<h3 style={{cursor: "pointer", margin: 0}} onClick={
				() => window.open("") // add link were you want to redirect
			}>EduBot
			</h3>
		),
		showAvatar: true,
		avatar: botAvatar,
		//closeChatIcon: closeChatIcon,
	},
	notification: {
		disabled: false,
		defaultToggledOn: true,
		volume: 0.2,
		//icon: notificationIcon,
		//sound: notificationSound,
		showCount: true,
	},
	audio: {
		disabled: true,
		defaultToggledOn: false,
		language: "en-US",
		voiceNames: ["Microsoft David - English (United States)", "Alex (English - United States)"],
		rate: 1,
		volume: 1,
		//icon: audioIcon,
	},
	chatHistory: {
        //by default the chatHistory is not disabled, it will be shown in the chat window. I changed it to true to disable it.
		disabled: true,
		maxEntries: 30,
		storageKey: "rcb-history",
		viewChatHistoryButtonText: "Load Chat History ⟳",
		chatHistoryLineBreakText: "----- Previous Chat History -----",
		autoLoad: false,
	},
	chatInput: {
		disabled: false,
		enabledPlaceholderText: "Type your message...",
		disabledPlaceholderText: "",
		showCharacterCount: false,
		characterLimit: -1,
		botDelay: 1000,
	//	sendButtonIcon: sendButtonIcon,
		blockSpam: true,
		sendOptionOutput: true,
		sendCheckboxOutput: true,
		sendAttachmentOutput: true,
	},
	chatWindow: {
		showScrollbar: false,
		autoJumpToBottom: false,
		showMessagePrompt: true,
		messagePromptText: "New Messages ↓",
		messagePromptOffset: 30,
	},
	sensitiveInput: {
		maskInTextArea: true,
		maskInUserBubble: true,
		asterisksCount: 10,
		hideInUserBubble: false,
	},
	userBubble: {
		animate: true,
		showAvatar: false,
		avatar: userAvatar,
		simStream: false,
		streamSpeed: 30,
		dangerouslySetInnerHtml: false,
	},
	botBubble: {
		animate: true,
		showAvatar: false,
		avatar: botAvatar,
        //Specifies whether to simulate text messages from the bot as a stream. Before was fale
		simStream: true,
		streamSpeed: 30,
		dangerouslySetInnerHtml: false,
	},
	voice: {
		disabled: true,
		defaultToggledOn: false,
		timeoutPeriod: 10000,
		autoSendDisabled: false,
		autoSendPeriod: 1000,
		//icon: voiceIcon,
	},
	footer: {
		text: (
			<div style={{cursor: "pointer"}} 
				onClick={() => window.open("")} // add link were you want to redirect
			>
				<span>Powered By </span>
				<span style={{fontWeight: "bold"}}>
					<img style={{width: 10, height: 10}} src={chatButton}></img>
					<span> React ChatBotify</span>
				</span>
			</div>
		),
	},
	fileAttachment: {
		disabled: false,
		multiple: true,
		accept: ".png",
		icon: fileAttachmentIcon,
	},
	emoji: {
		disabled: false,
		icon: emojiIcon,
		list: ["😀", "😃", "😄", "😅", "😊", "😌", "😇", "🙃", "🤣", "😍", "🥰", "🥳", "🎉", "🎈", "🚀", "⭐️"]
	},
	advance: {
		useCustomMessages: false,
		useCustomBotOptions: false,
		useCustomPaths: false,
	},

	// styles
	tooltipStyle: {},
	chatButtonStyle: {},
	notificationBadgeStyle: {},
	chatWindowStyle: {},
	headerStyle: {},
	bodyStyle: {},
	chatInputContainerStyle: {},
	chatInputAreaStyle: {},
	chatInputAreaFocusedStyle: {},
	chatInputAreaDisabledStyle: {},
	userBubbleStyle: {},
	botBubbleStyle: {},
	botOptionStyle: {},
	botOptionHoveredStyle: {},
	botCheckboxRowStyle: {},
	botCheckboxNextStyle: {},
	botCheckMarkStyle: {},
	botCheckMarkSelectedStyle: {},
	sendButtonStyle: {},
	sendButtonHoveredStyle: {},
	characterLimitStyle: {},
	characterLimitReachedStyle: {},
	chatHistoryButtonStyle: {},
	chatHistoryButtonHoveredStyle: {},
	chatHistoryLineBreakStyle: {},
	chatMessagePromptStyle: {},
	chatMessagePromptHoveredStyle: {},
	footerStyle: {},
	loadingSpinnerStyle: {},
}

export default myBotOptions;