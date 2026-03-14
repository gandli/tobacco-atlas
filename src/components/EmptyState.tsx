import { Search, Package, Inbox } from "lucide-react";

interface EmptyStateProps {
  /**
   * 空状态类型
   * - search: 搜索无结果
   * - filter: 筛选无结果
   * - data: 无数据
   * - default: 默认
   */
  type?: "search" | "filter" | "data" | "default";
  /**
   * 自定义标题
   */
  title?: string;
  /**
   * 自定义描述
   */
  description?: string;
  /**
   * 自定义操作按钮
   */
  action?: React.ReactNode;
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 额外类名
   */
  className?: string;
}

/**
 * 空状态组件
 * 
 * 用于展示搜索无结果、筛选无结果、无数据等场景
 * 
 * @example
 * ```tsx
 * <EmptyState type="search" />
 * <EmptyState 
 *   type="filter" 
 *   title="未找到品牌"
 *   description="尝试调整筛选条件"
 *   action={<Button>重置筛选</Button>}
 * />
 * ```
 */
export function EmptyState({ 
  type = "default", 
  title, 
  description,
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  // 默认图标
  const defaultIcons = {
    search: <Search className="w-12 h-12 text-muted-foreground/40" aria-hidden="true" />,
    filter: <Package className="w-12 h-12 text-muted-foreground/40" aria-hidden="true" />,
    data: <Inbox className="w-12 h-12 text-muted-foreground/40" aria-hidden="true" />,
    default: <Inbox className="w-12 h-12 text-muted-foreground/40" aria-hidden="true" />,
  };

  // 默认标题
  const defaultTitles = {
    search: "未找到相关结果",
    filter: "暂无符合条件的项目",
    data: "暂无数据",
    default: "暂无内容",
  };

  // 默认描述
  const defaultDescriptions = {
    search: "尝试使用其他关键词搜索",
    filter: "尝试调整筛选条件",
    data: "数据即将上线",
    default: "内容即将上线",
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      {/* 图标 */}
      <div className="mb-6" aria-hidden="true">
        {icon || defaultIcons[type]}
      </div>
      
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || defaultTitles[type]}
      </h3>
      
      {/* 描述 */}
      <p className="text-muted-foreground mb-6 max-w-sm">
        {description || defaultDescriptions[type]}
      </p>
      
      {/* 操作按钮 */}
      {action && (
        <div className="flex gap-2">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
