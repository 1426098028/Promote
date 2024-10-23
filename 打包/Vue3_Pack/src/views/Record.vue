<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="录屏" name="RecordScreen">
      <video v-if='ScreenDownloadInfo.href' :src="ScreenDownloadInfo.href" controls></video>
      <el-button :disabled="!StartRecord" type="primary" @click='onRecordScreen'> 录屏</el-button>
      <el-button :disabled="StartRecord" type="primary" @click='onEndRecordScreen'> 结束</el-button>
      <el-button v-show='ScreenDownloadInfo.href' type="primary" @click='onDownload'>下载</el-button>
    </el-tab-pane>
    <el-tab-pane label="录音" name="Recording">
      <audio v-if='SoundDownloadInfo.href' id="audioPlayback" :src="SoundDownloadInfo.href" controls></audio>
      <el-button :disabled="!StartRecord" type="primary" @click='Recording'> 录音</el-button>
      <el-button :disabled="StartRecord" type="primary" @click='EndRecording'> 结束</el-button>
      <el-button v-show='SoundDownloadInfo.href' type="primary" @click='onDownload'>下载</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue';
let activeName = ref('RecordScreen');
let StartRecord = ref(true);
let mediaRecorder;
let audioChunks = [];


const handleClick = () => {
  StartRecord.value = true;
};


const onRecordScreen = () => {
  StartRecord.value = false;
  console.log('录屏');
  Record();
};
const onEndRecordScreen = () => {
  console.log('结束录屏');
  mediaRecorder.stop();
};






let ScreenDownloadInfo = reactive({
  href: '',
  download: '',
});

// 录屏
const Record = async () => {
  audioChunks = [];
  const MIMETYPE = MediaRecorder.isTypeSupported('video/webm;codecs=h264') ? `video/webm;codecs=h264` : `video/webm`;
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: MIMETYPE });
    mediaRecorder.ondataavailable = event => {
      console.log(event.data);
      audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: audioChunks[0].type });
      const audioUrl = URL.createObjectURL(audioBlob);
      StartRecord.value = true;
      ScreenDownloadInfo = {
        href: audioUrl,
        download: audioChunks[0].type,
      };
    };
    // 开始录屏
    mediaRecorder.start();
  } catch (error) {
    console.log(error);
  }
};





const Recording = () => {
  StartRecord.value = false;
  console.log('录音');
  Sound();
};

const EndRecording = () => {
  console.log('结束录音');
  mediaRecorder.stop();
};

let SoundDownloadInfo = reactive({
  href: '',
  download: '',
});
// 录音
const Sound = async () => {
  const MIMETYPE = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? `audio/webm;codecs=opus` : `audio/webm`;
  console.log(MIMETYPE);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      // video: true
    });
    mediaRecorder = new MediaRecorder(stream, { mimeType: MIMETYPE });
    mediaRecorder.ondataavailable = event => {
      console.log(event.data);
      audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: audioChunks[0].type });
      const audioUrl = URL.createObjectURL(audioBlob);
      StartRecord.value = true;
      SoundDownloadInfo = {
        href: audioUrl,
        download: audioChunks[0].type,
      };
    };
    // 开始录音
    mediaRecorder.start();
  } catch (error) {
    console.log(error);
  }
};
const onDownload = () => {
  let a = document.createElement('a');
  a.href = (activeName.value === `RecordScreen` ? ScreenDownloadInfo : SoundDownloadInfo).href;
  a.download = (activeName.value === `RecordScreen` ? ScreenDownloadInfo : SoundDownloadInfo).download;
  a.click();
};
</script>
<style scoped></style>
