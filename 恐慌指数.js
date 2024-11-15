$httpClient.get('https://production.dataviz.cnn.io/index/fearandgreed/graphdata', function(error, response, data){
  if (error) {
    $done({}); // 如果请求失败，返回空数据
  } else {
    try {
      // 解析返回的数据
      //console.log(data);
      const jsonResponse = JSON.parse(data); 
      //console.log(jsonResponse);
      
      // 提取 "fear_and_greed" 中的 "score" 字段
      const score = jsonResponse.fear_and_greed.score;

      // 打印解析结果
      console.log(score);
      const roundedScore = Math.round(score);
      $notification.post('今日恐慌指数', roundedScore, '');
        $done({addresses: [roundedScore]}); //   
      } catch (error) {
      console.log("解析错误：", error);
      $done({});
    }
  }
});