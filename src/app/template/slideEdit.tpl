  <span v-show="editData.src">
    <input type="text" v-model="editData.src">
    <input id="files" type="file" v-on="change: changeImg(this, $event)">
  </span>
  <span v-show="fontSize"><input type="text" v-model="fontSize"></span>
<button v-on="click: addImage">add image</button>
<select v-model="pageData.transition" options="option.transition"></select>