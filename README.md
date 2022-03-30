# react-image-picker-editor

React tabs component for organizing content into separate views where only one view can be visible at a time.
When the list of tab labels exceeds the width of the header, pagination controls appear to let the user scroll left and right across the labels.
The active tab may be set using the activeIndex input or when the user selects one of the tab labels in the header.

![1](https://react-image-picker-editor.surge.sh/images/ex-1.png)
![1](https://react-image-picker-editor.surge.sh/images/ex-2.png)

## Install

```bash
npm install --save react-image-picker-editor
```

or

```bash
yarn add react-image-picker-editor
```

## Usage

The **react-image-picker-editor** provide a two component to recreate the diferent views by dividing content into different tabs.
You have **TabContainer** that is the wrapper of **TabItem** components.
**You must import the styles of these components**

```tsx
import 'react-image-picker-editor/dist/index.css';
```

### 1. Simple basic usage

```tsx
...
import TabContainer, { TabItem } from 'react-image-picker-editor';
import 'react-basic-stepper/dist/index.css';
...
<TabContainer color='#3949ab' borderLine >
    <TabItem name='tab1'>
      <h3>Content1</h3>
    </TabItem>
    <TabItem name='tab2'>
      <h3>Content2</h3>
    </TabItem>
    <TabItem name='tab3'>
      <h2>Content3</h2>
    </TabItem>
</TabContainer>
```

![1](https://react-image-picker-editor.surge.sh/images/ex-1.png)

You can set edit the header changing the backgroundColor, color, active-label style and other properties. Also you can pass icon to render with the name of the tabs

```tsx
...
import TabContainer, { TabItem } from 'react-image-picker-editor';
import 'react-basic-stepper/dist/index.css';
...
<TabContainer indicatorStyle="button" color='#1976d2' backgroundColor='#323232' fontColor='#fff'>
  <TabItem icon={<i style={{ marginRight: '4px' }} className="fa-solid fa-house"></i>} name='home'>
    <h3>Content1</h3>
  </TabItem>
  <TabItem icon={<i style={{ marginRight: '4px' }} className="fa-solid fa-gear"></i>} name='settings'>
    <h3>Content2</h3>
  </TabItem>

  <TabItem icon={<i style={{ marginRight: '4px' }} className="fa-solid fa-photo-film"></i>} name='images'>
    <h2>Content3</h2>
  </TabItem>
</TabContainer>
```

![1](https://react-image-picker-editor.surge.sh/images/ex-2.png)

### 2. Lazy Loading, initial active tab, different transition speed and a disabled tab

```tsx
<TabContainer lazy activeIndex={1} transitionMs={750} color='#3949ab' borderLine >
  <TabItem name='tab1'>
    <div style={{ padding: '1rem' }}>
      <iframe width="800" height="400" src="https://www.youtube.com/embed/MNX7HgcWqHc" title="YouTube video player"
         allow="accelerometer; autoplay" allowFullScreen></iframe>
    </div>
  </TabItem>
  <TabItem name='tab2'>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur,
       doloremque itaque ipsam ducimus sunt minus,
      nemo veniam error, neque corporis architecto in laudantium unde!
      Assumenda consequuntur eos magnam asperiores? Animi!
    </p>
  </TabItem>
  <TabItem name='tab3' >
    <h2>Content3</h2>
    <img alt='example' src="/full.jpg" width={800} />
  </TabItem>
  <TabItem name='tab4' disabled >
    <h2>Content3</h2>
    <img alt='big' src="/full-2.jpg" width={800} />
  </TabItem>
</TabContainer>
```

![1](https://react-image-picker-editor.surge.sh/images/ex-3.png)

### 3. Cascade Usage

You can use this component nested to another to create a cascading effect.
![1](https://react-image-picker-editor.surge.sh/images/ex-4.png)

The **TabContainer** component has props to customize it. We've seen so far the main capabilities as:

1. Possibility to change the color, background color, active style and basic style of the header.
2. We have a way to perform lazy loading function between tabs.
3. Change of the animation of the transition time between the tabs.
4. Enabling or disabling a specific tab.
5. Setting the active tab.

```ts
export interface TabContainerProps {
  activeIndex?: number; // Set the current active tab, default index 0.
  backgroundColor?: string // Set the background color for the tab header
  color?: string // Set the color of the active tab.
  indicatorStyle?: 'simple' | 'bottomLine' | 'button' // Enable diferent way to present the labels in the header of the tab
  onTabChange?: Function, // Callback function activated for each change of the current active tab
  lazy?: boolean; // Enables lazy loading, allow to render only the dom the active tab
  transitionMs?: number;
  borderLine?: boolean; // Enables border-botton in the header of tabs
  fontColor?: string; // Useful when using a different background color in the header, and you want to change the font color in it.
}
```

```ts
export interface TabItemProps {
   name: string; // The unique identificator of the tab, that it is the label rendered in the header of the component
   disabled?: boolean // Allow to disabled the navigation/clicking to TabItem
}
```

### [Demo](https://react-image-picker-editor.surge.sh/)

### Related Pakages

#### 1. [react-hook-modal](https://www.npmjs.com/package/react-hook-modal)

#### 2. [react-basic-stepper](https://www.npmjs.com/package/react-basic-stepper)

#### 3. [ngp-image-picker](https://www.npmjs.com/package/ngp-image-picker)

## License

MIT © [josealejandro2928](https://github.com/josealejandro2928)
