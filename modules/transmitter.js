const rf = require("nrf24");
/**
 * @author Mostafa Othman
 */
class Radio {
    _config = {
        PALevel: rf.RF24_PA_LOW,
        DataRate: rf.RF24_1MBPS,
        Channel: 76,
        AutoAck: true,
        Irq: -1
    }
    radio;
    _reading_pipe;
    //_writing_pipe;
    /**
     * Constructor for Radio.
     * @param {object} config configuration Object for Radio, if null then the default configuration will be used.
     */
    constructor(config) {
        this.radio =  new rf.nRF24(24, 0);
        if(!config){
            this.radio.config(this._config, false);
        }else{
            this.radio.config(config, false);
        }
    }
    /**
     * Getter for Radio.
     * @returns {object} radio as an object.
     */
    getRadio(){
        return this.radio;
    }
    /**
     *
     * @param {Radio} radio as a Radio object.
     */
    setRadio(radio){
        this.radio = radio;
    }
    /**
     * To stop the Radio.
     */
    stop(){
        if(this.radio){
            this.radio.destroy();
        }
    }
    /**
     * Setter for reading pipe.
     * @param {string} pipe reading pipe.
     */
    setReadingPipe(pipe){
        this._reading_pipe = pipe;
        this.radio.addReadPipe(pipe);
    }
    /**
     * Setter for writing pipe.
     * @param {string} pipe writing pipe.
     */
    // setWritingPipe(pipe){
    //     //this._writing_pipe = pipe;
    //     this.radio.useWritePipe(pipe, true);
    // }
    send(data, attempt, pipe){
        return new Promise((resolve, reject)=>{
            const interval = setInterval(()=>{
            attempt--;
            this.radio.useWritePipe(pipe, true);
            //this.radio.addReadPipe(this._reading_pipe);
            this.radio.write(Buffer.from(data), success=>{
                if(success){
                    clearInterval(interval)
                    //this.radio.removeWritePipe(pipe);
                    resolve()
                }else{
                    if(attempt === 0){
                        clearInterval(interval)
                        //this.radio.removeWritePipe(pipe);
                        reject('error')
                    }
                }
            })
            //this.radio.stopWrite()
           }, 100)
        })
    }
    read(onRead, onStop){
        //this.radio.useWritePipe(this._writing_pipe, true);
        this.radio.addReadPipe(this._reading_pipe);
        this.radio.read((data, item)=>{
            onRead(data[0].data.toString());
        }, ()=>{onStop()})
    }
    begin(){
        this.radio.begin()
    }
}
module.exports = Radio;