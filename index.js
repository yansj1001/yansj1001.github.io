let dataArray = []
  //获取文件数据
  document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      // 读取第一个工作表
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      // 将工作表内容转换为 JSON 格式，header: 1 会将第一行作为表头
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // 获取表头（第一行）
      const headers = jsonData[0];
      // 获取数据（去除表头）
      const rows = jsonData.slice(1);
      // 动态构建数据数组
      dataArray = rows.map(row => {
        const rowObject = {};
        headers.forEach((header, index) => {
          rowObject[header] = row[index];  // 根据表头为每列命名
        });
        return rowObject;
      });
      console.log("解析的Excel数据:", dataArray);  // 输出完整数据
  };

  // 确保 onload 定义后再读取文件
  reader.readAsArrayBuffer(file);
  })

  //展示表单
  function showBox(boxId) {
    // 隐藏所有表单
    var boxs = document.querySelectorAll('.boxs');
    boxs.forEach((box) => {
      box.classList.remove('is-active');
    });
    // 显示指定表单
    var selectedBox = document.getElementById(boxId);
    if (selectedBox) {
      selectedBox.classList.add('is-active');
    }
  }

  // 打开表单弹窗并设置动态属性
function openFormModal(attributeValue) {
  // 显示弹窗
  var modal = document.getElementById('formModal');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitle');
  var dynamicLabel = document.getElementById('dynamicLabel');
  var dynamicInput = document.getElementById('dynamicInput');
  modalTitle.innerText = '操作内容：' + attributeValue;
  dynamicLabel.innerText = attributeValue + '：';
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

// 打开总账弹窗并设置动态属性
function openZongZhangModal(attributeValue) {
  console.log(attributeValue);
  // 显示弹窗
  var modal = document.getElementById('formModalZZ');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitleZZ');
  var dynamicLabel = document.getElementById('dynamicLabelZZ');
  var dynamicInput = document.getElementById('dynamicInputZZ');
  modalTitle.innerText = '操作内容：' + attributeValue;
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

//打开期初期末为空的弹窗
function openReplaceModal(attributeValue) {
  console.log(attributeValue);
  // 显示弹窗
  var modal = document.getElementById('formModalZZ1');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitleZZ1');
  var dynamicLabel = document.getElementById('dynamicLabelZZ1');
  var dynamicInput = document.getElementById('dynamicInputZZ1');

  modalTitle.innerText = '操作内容：' + attributeValue;
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

//打开总账记录删除弹窗
function openDeleteModal(attributeValue) {
  console.log(attributeValue);
  alert('由于系统问题，增加减少在系统页面只展示一条，但是实际上有两条或者更多，如果显示successed但没生效就多删几次')
  // 显示弹窗
  var modal = document.getElementById('formModalZZ2');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitleZZ2');
  var dynamicLabel = document.getElementById('dynamicLabelZZ2');
  var dynamicInput = document.getElementById('dynamicInputZZ2');
  modalTitle.innerText = '操作内容：' + attributeValue;
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

//打开批量处理的弹窗
function openPLModal(attributeValue) {
  console.log(attributeValue);
  // 显示弹窗
  var modal = document.getElementById('formModalPL');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitlePL');
  var dynamicLabel = document.getElementById('dynamicLabelPL');
  var dynamicInput = document.getElementById('dynamicInputPL');
  console.log(dynamicInput)
  modalTitle.innerText = '操作内容：' + attributeValue;
  dynamicLabel.innerText = attributeValue + '：';
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

// 关闭弹窗
function closeModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = 'none';
}

// 表单提交处理
function handleSubmit(event,id) {
  event.preventDefault(); // 阻止默认表单提交行为
  // 获取表单数据
  var form = document.getElementById(id);
  var formData = new FormData(form);
  let account1 = ''
  let pwd1 = ''
  let belongCode1 = ''
  let code = ''
  let collName = ''
  let choose = ''
  let name = ''
  let data = ''
  let BSname = ''
  // 打印表单数据用于调试
  for (var [key, value] of formData.entries()) {
    console.log(key, value);
    if(key === "account"){
      account1 = value;
    } else if(key === "pwd"){
      pwd1 = encodeURIComponent(value);
    } else if(key === "belongCode"){
      belongCode1 = value;
    } else if(key === "id"){
      code =  value;
    } else if(key === 'collName'){
      collName = value;
    } else if(key === 'choose'){
      choose = value;
    }else if(key === 'BSname'){
      BSname = value;
    }else{
      name = key;
      data = value;
    }
  }
  console.log(account1, pwd1, belongCode1, code,choose, name, data);
  let baseUrl = '';
  let queryParams = '';
  let fullUrl='';
  const elements = document.getElementsByClassName('is-active');
  const chioce = elements[0].id;
  if(chioce === 'box1'){
    baseUrl = 'https://api.assetzj.cn/lddTest/UpdateInformation'
    queryParams = `?account1=${account1}&pwd1=${pwd1}&belongCode1=${belongCode1}&code=${code}&name=${name}&data=${data}`;
    fullUrl = baseUrl + queryParams;
  } else if (chioce === 'box2'){
    baseUrl = 'https://api.assetzj.cn/lddTest/updatePeriod';
    queryParams = `?account1=${account1}&pwd1=${pwd1}&belongCode1=${belongCode1}&date=${data}&name=${name}`;
    fullUrl = baseUrl + queryParams;
  } 
  if(name === '删除资产'){
    console.log('删除资产');
    baseUrl = 'https://api.assetzj.cn/lddTest/isDelete';
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '资产入账'){
    baseUrl = 'https://api.assetzj.cn/lddTest/insterInfo';
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&time=${data}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '入库入账修复'){
    baseUrl = 'https://api.assetzj.cn/lddTest/checkRepair';
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&date=${data}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '期初期末数据为空'){
    baseUrl = 'https://api.assetzj.cn/lddTest/dataOverlay';
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&collName=${collName}&targetCollName=${data}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '删除总账记录'){
    baseUrl = 'https://api.assetzj.cn/YansjTest/Tools/deleteRecord';
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}&time=${data}&flag=${choose}&name=${BSname}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '删除总账折旧记录'){
    baseUrl = 'https://api.assetzj.cn/YansjTest/Tools/deleteZheJiu'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}&time=${data}&flag=${choose}&name=${BSname}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '销账恢复'){
    baseUrl = 'https://api.assetzj.cn/YansjTest/Tools/Recover'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '资产销账'){
    baseUrl = 'https://api.assetzj.cn/lddTest/writeOff'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}&time=${data}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === "删除资产锁"){
    baseUrl = 'https://api.assetzj.cn/ChuangTest/Tools/deleteAllLocks'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '批量删除'){
    fullUrl = 'https://api.assetzj.cn/lddTest/22'
    const requestData = {
        account: account1,
        pwd: decodeURIComponent(pwd1),
        belongCode: belongCode1,
        collName:data,
        ids: dataArray // 包含解析的 Excel 数据
      };
      console.log(requestData)
    sendPost(fullUrl,requestData)
    return 
  } else if(name === '批量刷使用人使用部门'){
    fullUrl = 'https://api.assetzj.cn/YansjTest/Tools/update'
    const requestData = {
        account: account1,
        pwd: decodeURIComponent(pwd1),
        belongCode: belongCode1,
        ids: dataArray // 包含解析的 Excel 数据
      };
    sendPost(fullUrl,requestData)
    return 
  } else if(name === '批量折旧归零'){
    fullUrl = 'https://api.assetzj.cn/YansjTest/Tools/toZero'
    const requestData = {
        account: account1,
        pwd: decodeURIComponent(pwd1),
        belongCode: belongCode1,
        ids: dataArray // 包含解析的 Excel 数据
      };
    sendPost(fullUrl,requestData)
    return 
  } else if(name === '批量恢复'){
    console.log(44)
    fullUrl = 'https://api.assetzj.cn/YansjTest/Tools/recover'
    const requestData = {
        account: account1,
        pwd: decodeURIComponent(pwd1),
        belongCode: belongCode1,
        collName: data,
        ids: dataArray // 包含解析的 Excel 数据
      };
      sendPost(fullUrl, requestData);
      return 
  }
  sendGet(fullUrl)
}

//发送get请求
function sendGet(fullUrl){
    //TODO: 使用 fetch 或 AJAX 发送请求
    fetch(fullUrl, {
     method: 'GET'
   }).then(response => response.json())
     .then(data => {
       console.log(data)
       alert(JSON.stringify(data))
     })
     .catch(error => console.error('Error:', error));
}
//发送post请求
function sendPost(fullUrl,data){
  fetch(fullUrl, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data
      })
    }).then(response => response.json()).then(data => {
      console.log(data)
      alert(JSON.stringify(data))
    })
    console.log(fullUrl);
}

  // 页面加载时默认展示第一个表单
  window.onload = function () {
    showBox('box1');  // 默认展示表单 1
  };
