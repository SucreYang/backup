// check_ipv6_from_url.js
const domain = "tran2space.asuscomm.com";  // 要查询的域名
const previousIPv6Key = "previousIPv6Address";

(async () => {
    // 使用 HTTP 请求获取该域名的 AAAA 记录（IPv6 地址）
    const response = await $httpClient.get(`https://dns.google/resolve?name=${domain}&type=AAAA`);
    if (response.error) {
        console.log("Error fetching IPv6:", response.error);
        return;
    }

    const data = JSON.parse(response.body);
    const ipv6Addresses = data.Answer ? data.Answer.filter(item => item.data).map(item => item.data) : [];

    if (ipv6Addresses.length === 0) {
        console.log("没有找到 IPv6 地址");
        return;
    }

    // 获取存储的上一次 IPv6 地址
    const currentIPv6 = ipv6Addresses[0];  // 取第一个 IPv6 地址
    const previousIPv6 = $persistentStore.read(previousIPv6Key);

    // 检查 IPv6 地址是否变化
    if (currentIPv6 !== previousIPv6) {
        // 更新存储的 IPv6 地址
        $persistentStore.write(currentIPv6, previousIPv6Key);

        // 发送 Surge 通知
        $notification.post("IPv6 地址已更新", `新 IPv6 地址: ${currentIPv6}`, "");
    }
})();
