有三种方式

+ ChatGPT 官方订阅
+ OpenAI 官方 API
+ 第三方 API 中转服务（主要讲这个：简单但有一定封号风险）

# 一、下载 codex
+ openai 提供的 ai 工具，无需多言
+ 也可以用终端 cli 式的，这种是常规软件式，操作更友好

[https://chatgpt.com/zh-Hans-CN/codex/](https://chatgpt.com/zh-Hans-CN/codex/)

# 二、下载 cc switch
高效管理、配置 ai 工具

[https://www.ccswitch.io/zh/](https://www.ccswitch.io/zh/)

# 三、充值和配置
中转站

+ 一般可以用 gpt，也有一些其他厂家的模型
+ 充一定的额度在网站账号上，用多少扣多少
+ 一般会有水分，没有官方的纯，一般也够用了

比如 [I Code Easy](https://icodeeasy.cc/dashboard/)，以下步骤以该中转站为例

### 充值额度
<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785040159871-244bfeab-1b47-4b74-9f15-6377fb7df505.png" width="1536" title="" crop="0,0,1,1" id="u8611c290" class="ne-image">

重点看 api key 和 api 端点，待会要用

<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785040431810-8c4e6d5d-efdb-43fb-9723-7c19656baf9b.png" width="1536" title="" crop="0,0,1,1" id="u49e1112d" class="ne-image">

### cc switch 配置
<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785041216093-1be4383f-1055-4fd7-9dda-2b9ff70e660f.png" width="900" title="" crop="0,0,1,1" id="uc293deb2" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785041694672-b368a194-675b-4bc5-950a-8a9c4c03f5d1.png" width="900" title="" crop="0,0,1,1" id="uf2512c9c" class="ne-image">

需要在配置文件部分手动添加一行代码

`disable_response_storage = true`

<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785041804783-1842bc2d-19c1-410c-848e-ec52a0ba9134.png" width="720" title="" crop="0,0,1,1" id="u6960bda3" class="ne-image">

然后点击保存，回到主界面确保是在“使用中”的状态

<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785041864818-a1f69128-7ab7-4b89-8364-09a67af76b6e.png" width="900" title="" crop="0,0,1,1" id="u3a44f27e" class="ne-image">

### 打开 codex
<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785042211952-a71dbc6f-0193-4db1-a090-58d237f6fb64.png" width="1000" title="" crop="0,0,1,1" id="u88888be8" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1785042251680-b5a2f297-750c-4f52-b250-d62e3c2a0c7f.png" width="1000" title="" crop="0,0,1,1" id="ub7113456" class="ne-image">

鼠标悬浮在这里可以选择具体模型和推理强度，然后就可以进行对话了

### 一些注意点
+ 一般来说模型越强、推理程度越高，消耗 token 越多，视自身情况选择
+ 同一个对话任务中最好不要切换模型，在开始就选择好
+ 左下角齿轮部分是设置相关，切中文等功能都在这里，但是好像需要重启应用才生效

# 四、拓展
## chatgpt 官方订阅（月套餐会员）
<img src="https://cdn.nlark.com/yuque/0/2026/png/38959601/1784988869952-bfcf8e52-bf7d-47c5-ba5a-ec3987987cef.png" width="1536" title="" crop="0,0,1,1" id="fDH8g" class="ne-image">

充值方式稍微复杂，要了解可以看：

[直充gpt教程(1).pdf](https://www.yuque.com/attachments/yuque/0/2026/pdf/38959601/1785040020489-603e13d1-0c15-4b83-8720-c585d783c86d.pdf)
