/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, ReactNode, useEffect, useState } from "react"
import './styles.scss'
import { useRef } from 'react';

export interface TabContainerProp {
  children: Array<JSX.Element> | JSX.Element;
  activeIndex?: number;
  backgroundColor?: string;
  color?: string;
  indicatorStyle?: 'simple' | 'bottomLine' | 'button'
  onTabChange?: Function,
  lazy?: boolean;
  transitionMs?: number;
  borderLine?: boolean;
  fontColor?: string;
}

interface TabHeader {
  label: string;
  icon?: JSX.Element | string | null | undefined;
  disabled?: boolean
}

const TabContainer = memo(({
  activeIndex = 0,
  children,
  backgroundColor = 'inherit',
  color = '#428CFF',
  indicatorStyle = 'bottomLine',
  onTabChange = (index: number) => { },
  transitionMs = 375,
  borderLine = false,
  fontColor = 'inherit',
  lazy = false }:
  TabContainerProp) => {

  const [header, setHeader] = useState<Array<TabHeader>>([]);
  const [activeTab, setActiveTab] = useState(activeIndex);
  const tabContainerRef = useRef(null)

  useEffect(() => {
    const tabsItems = children instanceof Array ? children : [children];
    checkChildrens(tabsItems);
    const tabs = tabsItems.map(el => ({ label: el.props.name, icon: el.props.icon, disabled: el.props.disabled }))
    if (activeIndex > tabs.length - 1 || activeIndex < 0)
      throw new Error(`Invalid range for activeIndex ${activeIndex}`);
    setHeader(tabs);
  }, [children])

  useEffect(() => {
    const tabsItems = children instanceof Array ? children : [children];
    if (activeIndex > tabsItems.length - 1 || activeIndex < 0)
      throw new Error(`Invalid range for activeIndex ${activeIndex}`);
    setActiveTab(tabsItems[activeIndex]?.props?.disabled ? 0 : activeIndex);
  }, [activeIndex])

  useEffect(() => {
    if (header && header.length) {
      onTabChange(activeTab);
    }
  }, [activeTab])

  function checkChildrens(data: any[]) {
    try {
      data.map((el: any) => {
        if (!el.props.name)
          throw new Error('Inside of TabContainer component only can be rendered TabItem component, and its need a name prop')
        return true;
      })
    } catch (e) {
      throw new Error("The TabContainer Component must has a TabItem as child component");
    }

  }

  const tabsItems = children instanceof Array ? children : [children];

  return <div ref={tabContainerRef} className="tab-pp">
    <div className="header" style={{ backgroundColor: backgroundColor, borderBottom: borderLine ? '1px solid #323232' : 'undet' }}>
      {header.map((el, index) => (
        <button onClick={() => {
          if (el.disabled) return;
          setActiveTab(index)
        }} key={el.label}
          style={{
            color: index == activeTab && (indicatorStyle === 'simple' || indicatorStyle === 'bottomLine') ? color : fontColor,
            backgroundColor: index == activeTab && (indicatorStyle === 'button') ? color : 'inherit',
          }}
          className={index == activeTab ? `itemlabel ${indicatorStyle} active` : 'itemlabel'}
          disabled={el.disabled}
        >
          {el.icon} {el.label}
          {indicatorStyle === 'bottomLine' && (<div style={{ backgroundColor: color }}></div>)}
        </button>
      ))}
    </div>
    <div className="body">
      {tabsItems.map((tabEl, index) => {
        if (index < activeTab) {
          return (<div style={{
            transform: 'translate3d(-100%, 0px, 0px)',
            height: '0px',
            overflow: 'hidden',
            transition: `transform ${transitionMs / 1000}s ease`
          }} key={index} className={'body-content'}>
            {!lazy && tabEl}
          </div>)
        }
        if (index > activeTab) {
          return (<div style={{
            transform: 'translate3d(100%, 0px, 0px)',
            height: '0px',
            overflow: 'hidden',
            transition: `transform ${transitionMs / 1000}s ease`
          }} key={index} className={'body-content'}>
            {!lazy && tabEl}
          </div>)
        }
        else {
          return (<div style={{
            visibility: 'inherit',
            overflow: 'auto',
            height: 'auto',
            position: 'relative',
            transition: `transform ${transitionMs / 1000}s ease`
          }} key={index} className={'body-content'}>
            {tabEl}
          </div>)
        }
      })}

    </div>

  </div>
})

export const TabItem = memo(({ name, children, icon = null, type = 'TabItem', disabled = false }:
  {
    name: string;
    children: ReactNode, icon?: JSX.Element | string | null | undefined;
    disabled?: boolean
    type?: string
  }) => {
  return <div style={{ padding: '1rem 0.5rem' }}>
    {children}
  </div>
})

export default TabContainer
