import React from 'react'
import Posed from 'react-pose'
import Sound from 'react-sound'

const IMAGE_URL = {
    poop: "https://prodjito-nerdlet-assets.s3-us-west-1.amazonaws.com/happy_poop.png"
}

const SOUND_URL = {
    hello: 'https://prodjito-nerdlet-assets.s3-us-west-1.amazonaws.com/hello.mp3',
    bye: 'https://prodjito-nerdlet-assets.s3-us-west-1.amazonaws.com/bye.mp3'
};

const Image = Posed.img({
    startVisible: {
        opacity: 1,
        position: 'fixed',
        bottom:1000
    },
    startInvisible: {
        opacity: 0,
        position: 'fixed',
        bottom:1000
    },
    endVisible: {
        opacity:1,
        position: 'fixed',
        bottom: 0
    },
    endInvisible: {
        opacity: 0,
        position: 'fixed',
        bottom: 0
    },
    endRotate: {
        opacity: 1,
        position: 'fixed',
        bottom: 0,
        rotate: 180
    }
});

export default class Emoji extends React.Component {
    intervalId = 0

    constructor(props) {
        super(props);

        this.state = {
            imagePose: 'startVisible',
            leftPosition: this.pickLeftPosition(),
            interval: Math.floor(Math.random() * 3000) + 500,
            helloPlayStatus: Sound.status.STOPPED,
            byePlayStatus: Sound.status.STOPPED
        }

        this.handleClick = this.handleClick.bind(this)
    }

    pickLeftPosition() {
        return Math.floor(Math.random() * window.innerWidth)
    }

    handleClick() {
        if(this.state.imagePose = 'endVisible'){
            clearInterval(this.intervalId)
            this.setState({ 
                imagePose: 'endRotate',
            })
        }
    }

    componentDidMount() {
        soundManager.setup({debugMode: false});

        this.intervalId = setInterval(() => {

        if(this.state.imagePose == 'startVisible'){
            this.setState({ 
                imagePose: 'endVisible',
                helloPlayStatus: this.props.isMute ? Sound.status.STOPPED : Sound.status.PLAYING,
                byePlayStatus: Sound.status.STOPPED
             })
        }else if(this.state.imagePose == 'endVisible'){
            this.setState({ 
                imagePose: 'endInvisible',
                helloPlayStatus: Sound.status.STOPPED,
                byePlayStatus: this.props.isMute ? Sound.status.STOPPED : Sound.status.PLAYING
             })
        }else if(this.state.imagePose == 'endInvisible'){
            this.setState({ 
                imagePose: 'startInvisible',
                leftPosition: this.pickLeftPosition(),
                helloPlayStatus: Sound.status.STOPPED,
                byePlayStatus: Sound.status.STOPPED
            })
        }else if(this.state.imagePose == 'startInvisible'){
            this.setState({ 
                imagePose: 'startVisible',
                helloPlayStatus: Sound.status.STOPPED ,
                byePlayStatus: Sound.status.STOPPED
            })
        }
        
        }, this.state.interval);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { imageWidth, imageHeight, ...props } = this.props;
        return (
            <div>
                <Image
                    title={this.props.serviceName}
                    onClick={this.handleClick}
                    style={{left: this.state.leftPosition}} 
                    pose={this.state.imagePose} 
                    src={IMAGE_URL.poop} 
                    {...props} 
                />
                <Sound
                    url={SOUND_URL.hello}
                    playStatus={this.state.helloPlayStatus}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                />
                <Sound
                    url={SOUND_URL.bye}
                    playStatus={this.state.byePlayStatus}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                />
            </div>  
        )
    }
}