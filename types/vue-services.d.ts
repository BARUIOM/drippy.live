import 'vue'

import User from '@/modules/drippy-user'
import { Drippy } from '@/modules/drippy-api'
import { Player } from '@/modules/web-player'

declare module 'vue/types/vue' {

    interface Vue {

        readonly $user?: User;
        readonly $drippy: Drippy;
        readonly $player: Player;

    }

}