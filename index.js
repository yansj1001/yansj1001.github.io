let dataArray = []
  //获取文件数据
  document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
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

  //动态设置下拉框内容
  const options = {
    "财务入账状态名称":['已入账','未入账'],
    "资产状态名称":['在用','闲置', '报废','其他'],
    "资产入库状态":['已入库','未入库'],
    "接收状态名称":['已接收','未接收'],
    "是否有效启用状态":['是','否'],
    "核销状态":['已核销','未核销'],
    "资产状态":['在用','报废'],
    "资产处置回收方式":['集中处置'],
    "处置形式名称":['报废'],
    "折旧/摊销方法名称":['年限平均法（摊销）','不折旧'],
    "折旧/摊销状态名称":['提折旧','不提折旧']
  }
  const firstSelect = document.getElementById('first-select');
  const secondSelect = document.getElementById('second-select');
  // 根据第一个下拉框的选择动态更新第二个下拉框的内容
  function updateSecondSelect() {
    const selectedCategory = firstSelect.value;
    const items = options[selectedCategory] || [];

    // 清空第二个下拉框
    secondSelect.innerHTML = '';

    // 为第二个下拉框添加新的选项
    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      secondSelect.appendChild(option);
    });
  }

  // 初始化时根据第一个下拉框的默认选项填充第二个下拉框
  updateSecondSelect();

  // 监听第一个下拉框的变化
  firstSelect.addEventListener('change', updateSecondSelect);


  //展示表单
  function showBox(boxId, element) {
    // 隐藏所有表单
    var boxs = document.querySelectorAll('.boxs');
    boxs.forEach((box) => {
      box.classList.remove('is-active');
    });
    
    // 移除所有导航链接的active类
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    
    // 为当前点击的链接添加active类
    if (element) {
      element.classList.add('active');
    }
    
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

//打开修改状态弹框
function openZTModal(attributeValue) {
  console.log(attributeValue);
  // 显示弹窗
  var modal = document.getElementById('formModalZt');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitleZt');
  modalTitle.innerText = '操作内容：' + attributeValue;
  var dynamicInput = document.getElementById('dynamicInputZt');
  dynamicInput.name = attributeValue;  // 动态设置 input 的属性名
}

//打开删除办事弹框
function openDelBSModal(attributeValue) {
  console.log(attributeValue);
  // 显示弹窗
  var modal = document.getElementById('formModalBS');
  modal.style.display = 'block';
  // 修改弹窗标题和动态表单属性
  var modalTitle = document.getElementById('modalTitleBS');
  modalTitle.innerText = '操作内容：' + attributeValue;
  var dynamicInput = document.getElementById('dynamicInputBS');
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
  let ztKey = ''
  let ztValue = ''
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
    }else if(key === 'ztKey'){
      ztKey = value;
    }else if(key === 'ztValue'){
      ztValue = value;
    }else{
      name = key;
      data = value;
    }
  }
  console.log(account1, pwd1, belongCode1, code,choose, ztKey, ztValue);
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
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}&time=${data}&flag=${choose}&name=${encodeURIComponent(BSname)}`;
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
  } else if(name === '修改状态'){
    baseUrl = 'https://api.assetzj.cn/ChuangTest/Tools/updateAssetType'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}&key=${ztKey}&value=${ztValue}`;
    fullUrl = baseUrl + queryParams;
  } else if(name === '删除已完结办事'){
    baseUrl = 'https://api.assetzj.cn/lddTest/33'
    queryParams = `?account=${account1}&pwd=${pwd1}&belongCode=${belongCode1}&id=${code}`;
    fullUrl = baseUrl + queryParams;
  }else if(name === '批量删除'){
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

// 显示/隐藏loading的函数
function toggleLoading(show) {
  const loading = document.getElementById('loading');
  const mainContent = document.querySelector('main');
  const modals = document.querySelectorAll('.modal');
  
  if (show) {
    // 显示loading时
    loading.classList.add('show');
    // 禁用主内容区域
    mainContent.classList.add('disabled');
    // 禁用所有模态框
    modals.forEach(modal => {
      modal.classList.add('disabled');
    });
    // 禁用所有按钮和输入框
    document.querySelectorAll('button, input, select, a').forEach(element => {
      element.classList.add('disabled');
    });
  } else {
    // 隐藏loading时
    loading.classList.remove('show');
    // 启用主内容区域
    mainContent.classList.remove('disabled');
    // 启用所有模态框
    modals.forEach(modal => {
      modal.classList.remove('disabled');
    });
    // 启用所有按钮和输入框
    document.querySelectorAll('button, input, select, a').forEach(element => {
      element.classList.remove('disabled');
    });
  }
}

// 修改GET请求函数
function sendGet(fullUrl) {
  // 关闭所有modal
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
  
  toggleLoading(true); // 显示loading
  
  // 添加15秒超时控制
  const timeoutId = setTimeout(() => {
    toggleLoading(false);
  }, 15000);

  fetch(fullUrl, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      clearTimeout(timeoutId); // 清除超时计时器
      console.log(data);
      alert(JSON.stringify(data));
    })
    .catch(error => {
      clearTimeout(timeoutId); // 清除超时计时器
      console.error('Error:', error);
      alert('请求失败: ' + error.message);
    })
    .finally(() => {
      toggleLoading(false);
    });
}

// 修改POST请求函数
function sendPost(fullUrl, data) {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
  
  toggleLoading(true);
  
  // 添加15秒超时控制
  const timeoutId = setTimeout(() => {
    toggleLoading(false);
  }, 15000);

  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data
    })
  })
    .then(response => response.json())
    .then(data => {
      clearTimeout(timeoutId); // 清除超时计时器
      console.log(data);
      toggleLoading(false);
      setTimeout(() => {
        alert(JSON.stringify(data));
      }, 100);
    })
    .catch(error => {
      clearTimeout(timeoutId); // 清除超时计时器
      console.error('Error:', error);
      toggleLoading(false);
      setTimeout(() => {
        alert('请求失败: ' + error.message);
      }, 100);
    });
}

  // 页面加载时默认展示第一个表单和激活第一个导航项
  window.onload = function () {
    const firstNavLink = document.querySelector('.nav-link');
    showBox('box1', firstNavLink);
  };
