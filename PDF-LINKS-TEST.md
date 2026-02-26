# PDF 链接测试清单

## ✅ 已完成的PDF文件重命名

所有PDF文件已从包含空格和特殊字符的名称重命名为简洁的英文名：

| 原文件名 | 新文件名 | 状态 |
|---------|---------|------|
| `Yundi Guo's Portfolio Prj1.pdf` | `cloud-interactive-installation.pdf` | ✅ 已重命名 |
| `Yundi Guo's Portfolio Prj2.pdf` | `emotional-creature.pdf` | ✅ 已重命名 |
| `Yundi Guo's Project1.pdf` | `daily-grind-dashboard-process.pdf` | ✅ 已重命名 |
| `Yundi's Project 3 – Identity Specification Document.pdf` | `identity-spec-document.pdf` | ✅ 已重命名 |

---

## 🔗 网页中的PDF链接映射

| 项目名称 | PDF文件 | HTML链接 |
|---------|---------|---------|
| Daily Grind Dashboard | `daily-grind-dashboard-process.pdf` | ✅ 已配置 |
| Emotional Creature | `emotional-creature.pdf` | ✅ 已配置 |
| Cloud Interactive Installation | `cloud-interactive-installation.pdf` | ✅ 已配置 |
| Identity Specification Document | `identity-spec-document.pdf` | ✅ 已配置 |

---

## 🧪 测试方法

### 方法1：直接测试链接
在浏览器中打开 `index.html`，点击以下按钮测试：

1. **Daily Grind Dashboard** → 点击"查看设计过程PDF"
2. **Emotional Creature** → 点击"查看PDF"
3. **Cloud Interactive Installation** → 点击"查看PDF"
4. **Identity Specification Document** → 点击"查看PDF"

### 方法2：直接访问PDF URL
在浏览器地址栏中输入以下URL进行测试（假设使用 Live Server 在 5500 端口）：

```
http://127.0.0.1:5500/pdf/cloud-interactive-installation.pdf
http://127.0.0.1:5500/pdf/emotional-creature.pdf
http://127.0.0.1:5500/pdf/daily-grind-dashboard-process.pdf
http://127.0.0.1:5500/pdf/identity-spec-document.pdf
```

### 方法3：检查文件是否存在
在PowerShell中运行：
```powershell
cd e:\portfolio\pdf
Get-ChildItem *.pdf | Select-Object Name
```

---

## ⚠️ 注意事项

### AED Training Module 项目
该项目有一个"查看Case Study"按钮，链接到 `pdf/aed-case-study.pdf`。

**如果你有这个PDF文件**，请将其重命名为 `aed-case-study.pdf` 并放入 `pdf/` 文件夹。

**如果没有这个文件**，请告知我，我会从HTML中移除这个按钮。

---

## ✨ 所有链接的安全特性

所有PDF链接已包含以下安全属性：
- ✅ `target="_blank"` - 在新标签页打开
- ✅ `rel="noopener"` - 防止安全漏洞

---

## 📋 快速检查命令

检查所有PDF文件：
```powershell
Get-ChildItem e:\portfolio\pdf\*.pdf
```

检查HTML中的所有PDF链接：
```powershell
Select-String -Path "e:\portfolio\index.html" -Pattern 'href="pdf/'
```
