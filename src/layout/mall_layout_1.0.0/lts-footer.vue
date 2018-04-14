<template>
    <div class="s-span-page">
        <div class="footer-box">
            <ul class="partner">
                <li v-for="link in partner">
                    <a :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value"
                       class="partner-img-box"></a>
                </li>
            </ul>
            <div class="footer-menu-box">
                <ul>
                    <li><a target="_blank" href="http://www.ltsecurityinc.com/about-lts">{{
                        $t("comFooter.footerAboutLts") }}</a></li>
                    <li><a target="_blank" href="http://www.ltsecurityinc.com/contact">{{
                        $t("comFooter.footerContactUs") }}</a></li>
                    <li><a target="_blank" href="http://www.ltsecurityinc.com/careers">{{
                        $t("comFooter.footerInvitePerson") }}</a></li>
                </ul>
                <ul>
                    <li><a target="_blank" href="https://www.ltsecurityinc.com/support">{{
                        $t("comFooter.footerFollowSupport") }}</a></li>
                    <li><a target="_blank" href="http://www.ltsecurityinc.com/news">{{ $t("comFooter.footerEvevtNews")
                        }}</a></li>
                    <li><a target="_blank" href="http://www.ltsecurityinc.com/events">{{
                        $t("comFooter.footerFollowEvent") }}</a></li>
                </ul>
                <ul>
                    <li><a target="_blank" href="https://www.ltsecurityinc.com/terms-of-use">{{
                        $t("comFooter.footerUseItem") }}</a></li>
                    <li><a target="_blank" href="https://www.ltsecurityinc.com/privacy-policy">{{
                        $t("comFooter.footerSecretItem") }}</a></li>
                    <li><a target="_blank" href="https://www.ltsecurityinc.com/terms-and-Conditions">{{
                        $t("comFooter.footerItemCondition") }}</a></li>
                </ul>
                <ul>
                    <li>{{ $t("comFooter.footerFollowUs") }}:</li>
                    <li>
                        <a target="_blank" v-for="link in footerLinkList"
                           :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value"
                           class="link-img-box"></a>
                    </li>
                </ul>
            </div>
            <div class="footer-link-box">
                <div>Copyright © 2018 LT Security Inc., All Rights Reserved</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "lts-footer",
        data() {
            return {
                partner: [
                    {
                        value: 'hikvision',
                        img: require('@/assets/img/hikvision.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'resolution',
                        img: require('@/assets/img/resolution.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'MD',
                        img: require('@/assets/img/MD.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'seagate',
                        img: require('@/assets/img/seagate.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'unisight',
                        img: require('@/assets/img/unisight.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'ubiquiti',
                        img: require('@/assets/img/ubiquiti.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'napco',
                        img: require('@/assets/img/napco.png'),
                        link: 'javascript:void(0)'
                    }
                ],
                footerLinkList: [
                    {
                        value: 'lts',
                        img: require('@/assets/img/blog_icon.png'),
                        link: 'http://www.ltsecurityinc.com/discussion'
                    },
                    {
                        value: 'facebook',
                        img: require('@//assets/img/facebook_icon.png'),
                        link: 'https://www.facebook.com/CCTV.LTS'
                    },
                    {
                        value: 'linkedin',
                        img: require('@//assets/img/linkedin_icon.png'),
                        link: 'https://www.linkedin.com/authwall?trk=ripf&trkInfo=AQF2vCAKaW1cEwAAAWIK65i4LRRHjbpidiEMDaFnJhLcB6_zhSeYEDqB3b9mc4xmhP_3zAdPE4HtT04IgpuU8I3tR46n1bBQKuStDQ39U1TvOUF7NoQLWkbgBjU0hAzqwWb49Xc=&originalReferer=http://www.ltsecurityinc.com/discussion&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F894315'
                    },
                    {
                        value: 'twitter',
                        img: require('@//assets/img/twitter_icon.png'),
                        link: 'https://twitter.com/LTSecurityinc'
                    },
                    {
                        value: 'youtube',
                        img: require('@//assets/img/youtube_icon.png'),
                        link: 'https://www.youtube.com/user/LTSCCTV'
                    }
                ]
            }
        },
        methods: {},
        created() {

        },
    }
</script>
<style lang="less" scoped>
    .partner {
        margin: auto;
        margin-top: 24px;
        display: flex;
        justify-content: center;
        li {
            display: flex;
            margin-right: 24px;
        }
        li:last-child {
            margin-right: 0;
        }
        .partner-img-box {
            width: 140px;
            height: 30px;
            background-size: cover;

        }
    }

    .footer-box {
        width: 1124px;
        margin: auto;
        .footer-menu-box {
            padding-top: 35px;
            margin-bottom: 35px;
            display: flex;
            justify-content: space-between;
            text-align: left;
            li {
                font-size: 14px;
                color: #737373;
                margin-top: 15px;
                line-height: normal;
                .email {
                    font-size: 14px;
                }
                .email-remark {
                    font-size: 12px;
                }
                .email-input input {
                    -webkit-appearance: none;
                    background-color: #fff;
                    border-radius: 4px;
                    border: 1px solid #dcdfe6;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    color: #606266;
                    display: inline-block;
                    font-size: inherit;
                    height: 30px;
                    line-height: 1;
                    outline: 0;
                    margin-top: 6px;
                    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                    width: 100%;
                }
                .el-button--default {
                    font-size: 12px;
                    width: 90px;
                    height: 24px;
                    line-height: 24px;
                    padding: 0;
                    margin-top: 6px;
                    background-color: red;
                    color: #fff;
                }
                .link-img-box {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background-size: cover;
                    margin-right: 12px;
                }
            }
        }
        .footer-link-box {
            text-align: left;
            font-size: 14px;
            color: #737373;
            text-align: center;
        }

    }

</style>
