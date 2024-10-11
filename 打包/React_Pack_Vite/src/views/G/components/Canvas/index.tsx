import React, { useEffect } from 'react';
import { Circle, Line, Text, Canvas } from "@antv/g";
import { Renderer } from "@antv/g-canvas";
const FlyLine: React.FC = () => {
    useEffect(() => {


        // 创建 Canvas2D 渲染器
        const canvasRenderer = new Renderer();

        // 创建画布
        const canvas = new Canvas({
            container: "container",
            width: 600,
            height: 500,
            renderer: canvasRenderer
        });

        // 创建节点1
        const node1 = new Circle({
            style: {
                r: 40,
                fill: "#1890FF",
                stroke: "#F04864",
                lineWidth: 4,
                cursor: "pointer"
            }
        });
        const text1 = new Text({
            style: {
                text: "Node1", // 文本内容
                fontFamily: "Avenir", // 字体
                fontSize: 22, // 字号
                fill: "#fff", // 文本颜色
                textAlign: "center", // 水平居中
                textBaseline: "middle" // 垂直居中
            }
        });
        node1.appendChild(text1);
        node1.setPosition(200, 200);

        // 创建节点2
        const node2 = new Circle({
            style: {
                r: 40,
                fill: "#1890FF",
                stroke: "#F04864",
                lineWidth: 4
            }
        });
        const text2 = new Text({
            style: {
                text: "Node2", // 文本内容
                fontFamily: "Avenir", // 字体
                fontSize: 22, // 字号
                fill: "#fff", // 文本颜色
                textAlign: "center", // 水平居中
                textBaseline: "middle" // 垂直居中
            }
        });
        node2.appendChild(text2);
        node2.setPosition(400, 200);

        // 创建边
        const edge = new Line({
            style: {
                x1: 200,
                y1: 200,
                x2: 400,
                y2: 200,
                stroke: "#1890FF",
                lineWidth: 2
            }
        });

        // 向画布中添加图形
        canvas.appendChild(edge);
        canvas.appendChild(node1);
        canvas.appendChild(node2);

        // 为节点1添加交互，鼠标悬停改变颜色
        node1.addEventListener("mouseenter", () => {
            node1.style.fill = "red";
        });
        node1.addEventListener("mouseleave", () => {
            node1.style.fill = "#1890FF";
        });




    }, []);
    return <div style={{ minHeight: '500px', position: 'relative', justifyContent: 'center', }} id="container" />;
};
export default FlyLine;
