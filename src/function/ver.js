// 验证歌单当前是什么风格

function  ver(data){
    if(data == "huayu"){
        return "华语"
    }else if(data  == "gufeng"){
        return "古风"
    }else if(data == "omei"){
        return "欧美"
    }else if(data == "liuxing"){
        return "流行"
    }else if(data == "yaogun"){
        return "摇滚"
    }else if(data = "dianzi"){
        return "电子"
    }
}

export default ver 