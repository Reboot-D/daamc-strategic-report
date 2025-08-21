// 全局变量
let currentChapter = null;
let chapterData = {};

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 应用初始化
function initializeApp() {
    // 模拟加载延迟
    setTimeout(() => {
        hideLoading();
        initializeEventListeners();
        showHome();
    }, 1000);
}

// 隐藏加载状态
function hideLoading() {
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        // 完全移除加载覆盖层
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 300);
    }
}

// 初始化事件监听器
function initializeEventListeners() {
    // 滚动事件 - 显示/隐藏回到顶部按钮
    window.addEventListener('scroll', handleScroll);
    
    // 键盘导航支持
    document.addEventListener('keydown', handleKeyNavigation);
    
    // 窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 导航菜单点击外部关闭
    document.addEventListener('click', handleOutsideClick);
}

// 处理滚动事件
function handleScroll() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn && window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else if (backToTopBtn) {
        backToTopBtn.classList.remove('visible');
    }
}

// 处理键盘导航
function handleKeyNavigation(event) {
    // Esc 键返回首页
    if (event.key === 'Escape') {
        showHome();
    }
    
    // 数字键 1-9 快速跳转到对应章节
    if (event.key >= '1' && event.key <= '9') {
        const chapterNum = parseInt(event.key);
        loadChapter(chapterNum);
    }
}

// 处理窗口大小变化
function handleResize() {
    // 响应式布局调整逻辑
    updateLayout();
}

// 更新布局
function updateLayout() {
    const isMobile = window.innerWidth <= 768;
    const navMenu = document.getElementById('navMenu');
    
    // 移动端时关闭导航菜单
    if (!isMobile && navMenu) {
        navMenu.classList.remove('active');
    }
}

// 切换导航菜单
function toggleNavigation() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    
    if (navToggle) {
        navToggle.classList.toggle('active');
    }
}

// 处理点击外部关闭导航
function handleOutsideClick(event) {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle && 
        !navMenu.contains(event.target) && 
        !navToggle.contains(event.target) &&
        navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// 显示首页
function showHome() {
    // 清除当前章节内容，显示首页内容
    const homeContent = document.getElementById('home-content');
    const chapterContent = document.getElementById('chapter-content');
    
    if (homeContent && chapterContent) {
        homeContent.style.display = 'block';
        chapterContent.style.display = 'none';
        chapterContent.innerHTML = '';
    }
    
    currentChapter = null;
    updateNavigation();
    updateBreadcrumb('概览');
}

// 加载章节内容 - 动态渲染章节数据
function loadChapter(chapterNumber) {
    // 验证章节号范围
    if (chapterNumber < 1 || chapterNumber > 9) {
        console.error('无效的章节号:', chapterNumber);
        return;
    }
    
    // 直接跳转到对应的HTML文件
    const chapterUrl = `chapters/chapter${chapterNumber}.html`;
    window.location.href = chapterUrl;
}

// 渲染章节内容
function renderChapterContent(chapterData, chapterNumber) {
    const chapterContent = document.getElementById('chapter-content');
    if (!chapterContent) return;
    
    let html = `
        <div class="chapter-container">
            <div class="chapter-header">
                <h1 class="chapter-title-main">第${chapterNumber}章 ${chapterData.title}</h1>
                <p class="chapter-subtitle">${chapterData.subtitle}</p>
                <div class="chapter-meta">
                    <span>共 ${chapterData.articles.length} 个条款</span>
                    <span>重点关注：合规操作指引</span>
                    <span>更新时间：2025年1月</span>
                </div>
            </div>
            
            <div class="chapter-intro">
                <h2>章节简介</h2>
                <p>${chapterData.description}</p>
            </div>
    `;
    
    // 渲染条款
    chapterData.articles.forEach(article => {
        html += `
            <article class="article-item">
                <header class="article-header">
                    条款 ${article.number}
                </header>
                <div class="article-content">
                    <div class="article-section">
                        <h3 class="section-title">条款内容</h3>
                        <div class="section-content">
                            ${article.content}
                        </div>
                    </div>
                    
                    <div class="article-section">
                        <h3 class="section-title">核心解读</h3>
                        <div class="section-content">
                            ${article.interpretation}
                        </div>
                    </div>
                    
                    <div class="article-section">
                        <h3 class="section-title">概念说明</h3>
                        <div class="section-content">
                            ${article.concepts}
                        </div>
                    </div>
        `;
        
        // 渲染合规操作指引
        if (article.compliance && article.compliance.length > 0) {
            html += `
                    <div class="article-section compliance-guidance">
                        <h3 class="section-title">🎯 合规操作指引</h3>
                        <div class="section-content">
                            <ul class="compliance-list">
            `;
            
            article.compliance.forEach(item => {
                html += `
                                <li>
                                    <div class="compliance-item-title">${item.title}</div>
                                    <div>${item.content}</div>
                                </li>
                `;
            });
            
            html += `
                            </ul>
                        </div>
                    </div>
            `;
        }
        
        html += `
                </div>
            </article>
        `;
    });
    
    html += `
        </div>
    `;
    
    chapterContent.innerHTML = html;
}

// 获取章节数据
function getChapterData(chapterNumber) {
    const chapters = {
        1: {
            title: "概述和适用范围",
            subtitle: "指引的法律基础和适用对象",
            description: "本章确立了指引的法律效力、适用范围和基本原则，为整个合规体系奠定了法律基础。",
            articles: [
                {
                    number: "1.1",
                    content: "本指引由香港金融管理局根据相关条例发出，适用于持牌稳定币发行人。",
                    interpretation: "此条款确立了指引的法律约束力和适用范围。",
                    concepts: "持牌人被归类为金融机构，需遵守相应的反洗钱要求。",
                    compliance: [
                        {
                            title: "建立董事会层面认知",
                            content: "董事会必须明确确认公司的金融机构法律地位。"
                        },
                        {
                            title: "制定合规承诺声明",
                            content: "发布正式的反洗钱合规承诺声明。"
                        }
                    ]
                }
            ]
        },
        2: {
            title: "风险评估要求",
            subtitle: "机构层面风险识别与评估",
            description: "本章规定了持牌人必须进行的风险评估工作，建立全面的风险管理体系。",
            articles: [
                {
                    number: "2.1",
                    content: "持牌人应采取风险为本方法制定打击洗钱制度。",
                    interpretation: "风险为本方法是反洗钱合规的核心原则。",
                    concepts: "风险评估必须与实际风险水平相匹配。",
                    compliance: [
                        {
                            title: "制定风险评估政策",
                            content: "建立正式的机构风险评估政策文件。"
                        },
                        {
                            title: "实施定期风险评估",
                            content: "至少每年进行一次全面的风险评估。"
                        }
                    ]
                }
            ]
        },
        3: {
            title: "内部管控制度",
            subtitle: "反洗钱组织架构与治理",
            description: "本章要求建立健全的内部管控架构，确保合规体系的有效运行。",
            articles: [
                {
                    number: "3.1",
                    content: "持牌人应建立适当的管控制度。",
                    interpretation: "内部管控制度是合规体系的基础。",
                    concepts: "管控制度包括组织架构、政策流程等。",
                    compliance: [
                        {
                            title: "建立三道防线",
                            content: "构建业务部门、合规风控、内部审计的治理架构。"
                        },
                        {
                            title: "任命MLRO",
                            content: "正式任命洗钱报告主任并明确其职责。"
                        }
                    ]
                }
            ]
        },
        4: {
            title: "客户尽职审查",
            subtitle: "KYC要求与身份验证程序",
            description: "本章详细规定了客户尽职审查的全流程要求，包括政治敏感人员管理。",
            articles: [
                {
                    number: "4.1",
                    content: "客户与非客户稳定币持有人的区分定义。",
                    interpretation: "明确了KYC的适用范围。",
                    concepts: "客户是直接关系方，非客户是市场流转方。",
                    compliance: [
                        {
                            title: "建立客户分类系统",
                            content: "在系统中建立客户地址和非客户地址的分类标签。"
                        }
                    ]
                },
                {
                    number: "4.22",
                    content: "持牌人应设立及维持有效的程序，以判断某客户或某客户的实益拥有人是否政治人物。",
                    interpretation: "建立政治敏感人员识别机制。",
                    concepts: "PEP因其职位被卷入洗钱的风险更高，须以更高标准审慎对待。",
                    compliance: [
                        {
                            title: "采购PEP数据库",
                            content: "订阅国际知名的PEP商业数据库并集成到引导流程。"
                        },
                        {
                            title: "建立筛查流程",
                            content: "制定政治人物筛查操作手册和复核流程。"
                        }
                    ]
                }
            ]
        },
        5: {
            title: "交易监控",
            subtitle: "可疑交易识别与报告",
            description: "本章规定了交易监控系统的建设要求，确保及时发现可疑活动。",
            articles: [
                {
                    number: "5.1",
                    content: "持续监察是有效反洗钱制度的重要元素。",
                    interpretation: "交易监控需要针对稳定币业务特点设计。",
                    concepts: "监控重点是发行和赎回环节。",
                    compliance: [
                        {
                            title: "采购区块链分析工具",
                            content: "订阅专业的区块链分析服务。"
                        },
                        {
                            title: "建立监控规则",
                            content: "制定针对稳定币业务的交易监控规则。"
                        }
                    ]
                }
            ]
        },
        6: {
            title: "记录保存",
            subtitle: "文档管理与档案要求",
            description: "本章规定了各类记录的保存要求，特别是转帐规则的实施。",
            articles: [
                {
                    number: "6.1",
                    content: "转帐规则(Travel Rule)的实施要求。",
                    interpretation: "消除匿名性，确保资金可追溯。",
                    concepts: "信息必须随资金一起传递。",
                    compliance: [
                        {
                            title: "建立技术基础设施",
                            content: "部署支持Travel Rule的技术系统。"
                        },
                        {
                            title: "制定对手方尽职调查程序",
                            content: "建立VASP对手方风险评估和管理流程。"
                        }
                    ]
                }
            ]
        },
        7: {
            title: "制裁合规",
            subtitle: "金融制裁与反恐融资",
            description: "本章要求建立CTF、制裁和CPF的三位一体防控体系。",
            articles: [
                {
                    number: "7.1",
                    content: "持牌人应设立及维持有效的政策、程序及管控措施，以确保遵守有关恐怖分子资金筹集、金融制裁及武器扩散资金筹集的相关规例及法例。",
                    interpretation: "将合规要求扩展到三位一体的金融犯罪防控体系。",
                    concepts: "CTF、制裁和CPF需要综合防控措施。",
                    compliance: [
                        {
                            title: "制定金融犯罪合规框架",
                            content: "制定总领性的CTF、制裁和CPF政策文件。"
                        },
                        {
                            title: "建立治理架构",
                            content: "明确任命制裁合规负责人并建立三道防线。"
                        }
                    ]
                }
            ]
        },
        8: {
            title: "可疑交易报告",
            subtitle: "STR义务与执法配合",
            description: "本章规定了可疑交易报告的法定义务和执法配合要求。",
            articles: [
                {
                    number: "8.1",
                    content: "任何人如知道或怀疑任何财产是贩毒得益、可公诉罪行得益或恐怖分子财产，负有法定责任须尽快向联合财富情报组提交可疑交易报告。",
                    interpretation: "STR是带有刑事责任的强制性法律义务。",
                    concepts: "知道或怀疑的标准较低，体现宁可错报不可漏报原则。",
                    compliance: [
                        {
                            title: "建立内部报告渠道",
                            content: "建立保密的内部可疑活动报告渠道直达MLRO。"
                        },
                        {
                            title: "明确个人责任",
                            content: "在员工手册中明确每位员工的法律责任。"
                        }
                    ]
                }
            ]
        },
        9: {
            title: "记录管理",
            subtitle: "文档保存与合规档案",
            description: "本章规定了各类合规记录的保存要求和管理义务。",
            articles: [
                {
                    number: "9.1",
                    content: "备存纪录是侦测、调查及没收罪犯或恐怖分子财产的审计线索的重要一环。",
                    interpretation: "记录保存具有支持执法、司法审查和合规证明的三重价值。",
                    concepts: "完善的记录是连接链上交易与现实身份的关键桥梁。",
                    compliance: [
                        {
                            title: "制定记录保存总政策",
                            content: "建立公司级别的记录保存政策和治理架构。"
                        },
                        {
                            title: "建立数据地图",
                            content: "创建全面的数据地图标示所有记录的存储位置。"
                        }
                    ]
                }
            ]
        }
    };
    
    return chapters[chapterNumber] || null;
}

// 这些渲染函数现在不再需要，因为我们直接跳转到HTML文件
// 如果需要在其他地方使用章节数据，可以通过getChapterData函数获取

// 更新导航状态
function updateNavigation() {
    // 清除所有导航链接的激活状态
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // 如果当前有选中章节，高亮对应的导航链接
    if (currentChapter) {
        const currentNavLink = document.querySelector(`[data-chapter="${currentChapter}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
    }
}

// 更新面包屑导航 - 现在主要用于首页
function updateBreadcrumb(currentPage) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = currentPage;
    }
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示错误消息
function showErrorMessage(message) {
    const chapterContent = document.getElementById('chapter-content');
    if (chapterContent) {
        chapterContent.innerHTML = `
            <div class="error-message">
                <h2>出现错误</h2>
                <p>${message}</p>
                <button onclick="showHome()" class="quick-link">返回首页</button>
            </div>
        `;
        chapterContent.style.display = 'block';
    }
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 错误处理
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// 导出主要函数（如果需要模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadChapter,
        showHome,
        scrollToTop
    };
}