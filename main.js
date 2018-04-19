   //第一步：值的初始化
   var keyA = init();
   keyboard = keyA['keyboard'];
   keyWeb = keyA['keyWeb'];

   //键盘初始化
   initKeyboard(keyboard, keyWeb);

   //监听键盘事件
   listenToUser(keyWeb);



   function init() {
       var keyboard = {
           '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
           '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
           '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
           'length': 3
       }

       var keyWeb = {
           'q': 'qq.com',
           'w': 'weibo.com',
           'e': 'ele.me',
           'r': 'renren.com',
           't': 'tianya.com',
           'y': 'youtube.com',
           'u': 'uc.com',
           'i': 'iqiyi.com',
           'o': 'opera.com',
           'a': 'acfun.tv',
           's': 'sohu.com',
           'z': 'zhihu.com',
           'm': 'www.mcdonalds.com.cn'
       }
       var keyboardStore = getStore('keyWebStore');
       if (!keyboardStore) {
           keyboar = keyboardStore;
       }

       return {
           'keyboard': keyboard,
           'keyWeb': keyWeb
       }
   }



   function getStore(keyWebStore) {
       return JSON.parse(localStorage.getItem(keyWebStore) || 'null')
   }

   function tag(tagName) {
       return document.createElement(tagName)
   }

   function creatSpan(key) {
       var span = tag('span')
       span.textContent = key
       span.className = "text"
       return span
   }

   function creatImage(webKey) {
       var img = tag('img')
       if (webKey) {
           img.src = 'http://' + webKey + '/favicon.ico'
       } else {
           img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
       }
       img.onerror = function (res) {
           res.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
       }
       return img
   }

   function creatButton(key) {
       var button = tag('button')
       button.textContent = '编辑'
       button.id = key
       button.onclick = function (res) {
           var button2 = res['target']
           var img2 = button2.previousSibling
           var key2 = button2['id']
           var x = prompt('给我一个网址')
           hash[key2] = x
           img2.src = 'http://' + x + '/favicon.ico'
           img2.onerror = function (xxx) {
               xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
           }
           localStorage.setItem('keyWebStore', JSON.stringify(hash))
       }
       return button
   }

   function listenToUser(hash) {
       document.onkeypress = function (res) {
           var key = res['key']
           var website = hash[key]
           window.open('http://' + website, '_blank')
       }
   }

   function initKeyboard(keyboard, keyWeb) {
       for (var i = 0; i < keyboard.length; i++) {
           var divTag = tag('div')
           divTag.className = 'row'
           main.appendChild(divTag)
           var rowKeyboard = keyboard[i];
           for (var j = 0; j < rowKeyboard['length']; j++) {
               var kbd = tag('kbd')
               kbd.className = 'key'
               var spanTag = creatSpan(rowKeyboard[j])
               var imgTag = creatImage(keyWeb[rowKeyboard[j]])
               var buttonTag = creatButton(rowKeyboard[j])
               kbd.appendChild(spanTag)
               kbd.appendChild(imgTag)
               kbd.appendChild(buttonTag)
               divTag.appendChild(kbd)
           }


       }

   }
