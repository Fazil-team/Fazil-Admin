import {h} from "vue";
import {NIcon} from "naive-ui";
import NuxtLink from "#app/components/nuxt-link.js";

export async function asyncRenderIcon(icon) {
    const {[icon]: iconComp} = await import("@vicons/antd");
    return () => h(NIcon, null, {default: () => h(iconComp)});
}

export function RenderIcon(icon) {
    const {[icon]: iconComp} = import("@vicons/antd");
    return () => h(NIcon, null, {default: () => h(iconComp)});
}

export const gen_router_paths = async (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (element.menuRouterPath != null) {
            if (element.icon != null) {
                if (element.menuType != 'ACTIVE') {
                    result.push({
                        label: element.menuType == 'ITEM' ? element.outline ? () => h(
                            'a', {
                                href: element.menuRouterPath,
                                target: '_blank'
                            },
                            element.menuName
                        ) : () => h(NuxtLink, {
                            to: element.menuRouterPath
                        }, element.menuName) : element.menuName,
                        key: element.menuRouterPath,
                        disabled: element.disable,
                        icon: element.icon != '' ? await asyncRenderIcon(element.icon) : null
                    })
                }
            } else {
                result.push({
                    label: element.menuType == 'ITEM' ? element.outline ? () => h(
                        'a', {
                            href: element.menuRouterPath,
                            target: '_blank'
                        },
                        element.menuName
                    ) : () => h(NuxtLink, {
                        to: element.menuRouterPath
                    }, element.menuName) : element.menuName,
                    key: element.menuRouterPath,
                    disabled: element.disable
                })
            }

        }
        if (element.treeMenus != undefined && element.treeMenus.length != 0) {
            let children = await gen_router_paths(element.treeMenus)
            if (children.length != 0) {
                result[i].children = children;
            }
        }
    }
    return result
}

export const gen_charts_series = (...data) => {

}

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

/**
 * 自动转换存储单位
 * @param {number} bytes - 字节数（最小单位为字节）
 * @param {number} decimals - 小数保留位数，默认 2 位
 * @returns {string} 格式化后的字符串，例如 "1.23 MB"
 */
export const format = (bytes, decimals = 2) => {
    if (isNaN(bytes) || bytes <= 0) return '0 B';

    const base = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(base));
    const value = bytes / Math.pow(base, i);
    const rounded = parseFloat(value.toFixed(decimals));

    return `${rounded} ${UNITS[i]}`;
}
