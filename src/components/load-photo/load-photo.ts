import { Block } from "core";

export class LoadPhoto extends Block {
    protected render():string  {
        return `
        <label for="popup" class="label-for-popup">
            <img src="../asserts/photo.png" alt="pick-photo">
        </label>
        <h1 class="user-name" style="visibility: {{user-name_visibility}}">Иван</h1>
        <div class="popup">
            <input type="checkbox" id="popup" class="popup__state">
            <div class="popup__wrapper">
                <label for="popup" class="popup__bg"></label>
                <form action="" id="form-for-avatar" class="form-for-avatar form">
                    <h2 class="form-for-avatar__title">Загрузите файл</h2>
                    <label for="load-avatar" class="form-for-avatar__label">Выбрать файл на компьютере</label>
                    {{{Input
                        onInput=onInput
                        onFocus=onFocus
                        onBlur=onBlur
                        type="{{type}}"
                        name="{{name}}"
                        placeholder="{{placeholder}}"
                        ref="inputField"
                        value=value
                    }}}
                    <div class="form__item">
                        {{{Button text="Поменять"}}}
                        {{InputError error=error ref="errorField"}}
                    </div>
                </form>
            </div>
        </div>
        `
    }
}
