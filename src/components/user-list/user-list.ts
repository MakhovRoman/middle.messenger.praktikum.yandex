import { Block } from 'core';

type UserListProps = {
    userList: Record<string, unknown>
}

export class UserList extends Block {
    static cName = 'UserList';

    constructor(props: UserListProps) {
        super(props);
    }

    protected render() {
        return `
        <ul class="list-users">
        {{#each userList}}
        <li class="list__item" data-id={{id}} onclick="handleUsers({{this.id}})">
          <span class="list__divider"></span>
          <div class="list__item-inner">
            <img class="list__item-avatar"
              onerror="src='https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png'"
              src={{avatar}} alt="Аватар" />
            <div class="list__item-text_users">
              <p class="list__item-title">{{login}}</p>
              <p class="list__item-subtitle">
                <span class="list__item-subtitle-text">{{first_name}} {{second_name}}</span>
              </p>
            </div>
          </div>
        </li>
        {{/each}}
      </ul>
        `
    }
}
