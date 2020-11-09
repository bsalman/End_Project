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
    /**
     * 
     */
    sendTasks = [];
    checkConnectedTasks = [];
    radioFree = true;
    send(data, attempt, pipe){
        const promiseExecuter = () => {
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
        return new Promise((resolve, reject) => {
            const sendInterval = setInterval(() => {
                const checkPromise = this.sendTasks.find(task => task.interval === sendInterval)
                if (checkPromise) {
                    if(checkPromise.result.done) {
                        clearInterval(sendInterval)
                        this.sendTasks[this.sendTasks.map(tks => tks.interval).indexOf(sendInterval)].result.got = true
                        if(checkPromise.result.ok) {
                            resolve()
                        } else {
                            reject()
                        }

                    }
                }
            
            }, 50);
            this.sendTasks.push({
                interval: sendInterval,
                promiseExecuter: promiseExecuter,
                result: {done: false, ok: false, got: false }
            })
        })
        

        
        
        
    }
    checkConnected(data, attempt, pipe){
        const promiseExecuter = () => {
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
        return new Promise((resolve, reject) => {
            const sendInterval = setInterval(() => {
                const checkPromise = this.checkConnectedTasks.find(task => task.interval === sendInterval)
                if (checkPromise) {
                    if(checkPromise.result.done) {
                        clearInterval(sendInterval)
                        this.checkConnectedTasks[this.checkConnectedTasks.map(tks => tks.interval).indexOf(sendInterval)].result.got = true
                        if(checkPromise.result.ok) {
                            resolve()
                        } else {
                            reject()
                        }

                    }
                }
            
            }, 50);
            this.checkConnectedTasks.push({
                interval: sendInterval,
                promiseExecuter: promiseExecuter,
                result: {done: false, ok: false, got: false }
            })
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
        setInterval(() => {
            if (this.radioFree){
                
                this.sendTasks = this.sendTasks.filter(task =>!task.result.got)
                if(this.sendTasks[0]) {
                    this.radioFree = false
                    this.sendTasks[0].promiseExecuter().then(() => {
                        this.radioFree = true
                        this.sendTasks[0].result.done = true;
                        this.sendTasks[0].result.ok = true;
                        
                    }).catch(error => {
                        this.radioFree = true
                        this.sendTasks[0].result.done = true;
                        this.sendTasks[0].result.ok = false;
                        
                    })
                }else {
                    this.checkConnectedTasks = this.checkConnectedTasks.filter(task =>!task.result.got)
                    if(this.checkConnectedTasks[0]) {
                        this.radioFree = false
                        this.checkConnectedTasks[0].promiseExecuter().then(() => {
                            this.radioFree = true
                            this.checkConnectedTasks[0].result.done = true;
                            this.checkConnectedTasks[0].result.ok = true;
                            
                        }).catch(error => {
                            this.radioFree = true
                            this.checkConnectedTasks[0].result.done = true;
                            this.checkConnectedTasks[0].result.ok = false;
                            
                        })
                    } else {
                        this.radioFree = true
                    }
                    
                }
                
            }
            
        }, 100);
    }
}
module.exports = Radio;