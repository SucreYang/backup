// check_ipv6.js
const previousIPv6Key = "previousIPv6Address";

(async () => {
    // 获取当前 IPv6 地址
    const response = await $httpClient.get("https://api64.ipify.org?format=json");
    if (response.error) {
        console.log("Error fetching IPv6:", response.error);
        return;
    }

    const currentIPv6 = JSON.parse(response.body).ip;

    // 获取存储的上一次的 IPv6 地址
    const previousIPv6 = $persistentStore.read(previousIPv6Key);

    // 检查 IPv6 地址是否变化
    if (currentIPv6 !== previousIPv6) {
        // 更新存储的 IPv6 地址
        $persistentStore.write(currentIPv6, previousIPv6Key);

        // 发送 Surge 通知
        $notification.post("IPv6 地址已更新", `新 IPv6 地址: ${currentIPv6}`, "");
    }
})();
