/* 
 * Copyright (c) 2016, jorritvandenberg
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

function initiatePlayBack(fullBackLayer, videoList, browserType, frameRate) { 
   
    var attachDelay,
        currentTime1,
        currentTime2,    
        initialTimeOffset,
        playBackTime;    

    initialTimeOffset = 0.001;
    attachDelay = estimateTimeUpdateFrequency(browserType, attachDelay, frameRate);

    $("#fullBackLayer").one("timeupdate", function() {

        currentTime1 = fullBackLayer.currentTime;

        setTimeout(
                (function(){

                    currentTime2 = fullBackLayer.currentTime;

                    if (currentTime1 < currentTime2){
                        initialTimeOffset += (currentTime2 - currentTime1);
                    }

                    playBackTime = currentTime1 + initialTimeOffset;

                    for (var i = 0; i < videoList.length; i++) {
                        var videoTile = videoList[i];
                        videoTile.currentTime = playBackTime;
                    }

                    if (!fullBackLayer.paused){                    
                        for (var i = 0; i < videoList.length; i++) {
                            var videoTile = videoList[i];
                            videoTile.play();
                        }
                    }

                }
        ), attachDelay);

    for (var i = 0; i < zoomLayer1PlayerObjects.length; i++) { 
        var player = zoomLayer1PlayerObjects[i];
        
        if (i === 0) {
            
            if (player.getBitrateInfoListFor("video").length > 1){
                masterQuality = player.getQualityFor("video"); 
            }  
        
        } if (i > 0 && masterQuality) {            
            player.setAutoSwitchQuality(false);
            player.setQualityFor("video", masterQuality);
            
    }}
    });

}

function estimateTimeUpdateFrequency(browserType, attachDelay, frameRate) {
    
    if (browserType === "FireFox") {
        attachDelay = 1000 / frameRate;
    } else {
        attachDelay = timeUpdateIntervals[browserType];
    }
    
    return attachDelay;
}

function emitBitrateChanges(playerList, masterQuality) {

    playerList[0].eventBus.addEventListener(MediaPlayer.events.METRIC_CHANGED, function() {
        
        var currentQuality = playerList[0].getQualityFor("video");
        
        if (masterQuality != currentQuality) {
            masterQuality = currentQuality;
            
            for (var i = 1; i < playerList.length; i++) { 
                var player = playerList[i];         

                if (i > 0){
                    player.setQualityFor("video", masterQuality);
                }
            }  

        }
        
    });   

}

function resetPlayers(playerList) {

    for (var i = 0; i < playerList.length; i++) { 
        
        var player = playerList[i];
        player.reset();
    }
}

function updateViewLayerOnReadyState(videoElementsList, xPosition, yPosition, viewLayer) {

    for (var i = 0; i < videoElementsList.length; i++) {
        
        if (!videoElementsList[i].ReadyState === 4) {
            i -= 1;
        }
        
        if (i === 3){
           updateVideoContainer(xPosition, yPosition, viewLayer, 1200, null); 
        }
    }
}