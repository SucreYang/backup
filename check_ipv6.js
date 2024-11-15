let previousIpv6 = $persistentStore.read("previousIpv6") || '';
$httpClient.get('https://120.53.53.53/dns-query?name=tran2space.asuscomm.com&type=AAAA', function(error, response, data){
  if (error) {
    $done({}); // 如果请求失败，返回空数据
  } else {
    try {
      // 解析返回的数据
      const jsonResponse = JSON.parse(data.split(';')[0]); // 将字符串转为 JSON 对象
      console.log("解析后的数据：", jsonResponse);

      // 提取 IPv6 地址
      if (jsonResponse.Answer && jsonResponse.Answer.length > 0) {
        const ipv6 = jsonResponse.Answer[0].data;
   
          if (ipv6 && ipv6 !== previousIpv6) {
            previousIpv6 = ipv6;
            $persistentStore.write(previousIpv6, "previousIpv6");
            console.log(ipv6);
            $notification.post('IPV6更新提醒', '更新后的IP如下', ipv6);
          } else {
             $notification.post('IPV6未改变', 'IPV6地址如下', ipv6);
            }
         
        $done({addresses: [ipv6], ttl: 600}); // 返回 IPv6 地址

      } else {
        console.log("没有找到 IPv6 地址！");
        $done({});
      }
    } catch (error) {
      console.log("解析错误：", error);
      $done({});
    }
  }
});