import 'vue'

import User from '@/modules/drippy-user'
import { Drippy } from '@/modules/drippy-api'
import { Player } from '@/modules/web-player'
import { Message } from '@/modules/utils'

declare module 'vue/types/vue' {

    interface Vue {

        $user: User;
        readonly $drippy: Drippy;
        readonly $player: Player;

        notify(message: Message): void;

    }

}