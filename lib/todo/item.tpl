<%_.each(obj,function(e,i){%>
    <li>
        <input type="checkbox"/>
        <label><%=e.ctnt%></label>
        <input type="text" class="dy_ipt hide" value="">
        <div class="item_hover">
            <a href="#" class="item_move" onclick="moveTodo(todo)">ltr</a>
            <a href="#" class="item_del" onclick="remove(todo)">del</a>
        </div>
    </li>
<%})%>