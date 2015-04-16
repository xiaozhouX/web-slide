  <span v-show="editData.src">
    <input type="text" v-model="editData.src">
    <input id="files" type="file" v-on="change: changeImg(this, $event)">
  </span>
  <span v-show="fontSize"><input type="text" v-model="fontSize"></span>
<select v-model="pageData.transition" options="option.transition"></select>
<button v-on="click: addImage">add image</button>
<br>
<textarea name="" id="" cols="130" rows="3" v-model="pageData.note"></textarea>