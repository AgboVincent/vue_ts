<template>
  <div class="row">
    <div class="col">
      <div class="item">
        <p class="field">{{$t('Car Manufacturer')}}</p>
        <p class="value">{{ claim.policy.vehicle.manufacturer }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Car Color')}}</p>
        <p class="value">{{ claim.policy.vehicle.color }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Engine Number')}}</p>
        <p class="value">{{ claim.policy.vehicle.engine_number }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">{{$t('Year of Manufacturer')}}</p>
        <p class="value">{{ claim.policy.vehicle.year }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Registration Number')}}</p>
        <p class="value">{{ claim.policy.vehicle.registration_number }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Estimated Value')}}</p>
        <p class="value">{{ money(claim.policy.vehicle.estimate) }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">{{$t('Model')}}</p>
        <p class="value">{{ claim.policy.vehicle.model }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Chassis Number')}}</p>
        <p class="value">{{ claim.policy.vehicle.chassis_number }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Policy Number')}}</p>
        <p class="value">{{ claim.policy.number }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ClaimType} from "../../types";

export default defineComponent({
  name: 'ClaimVehicleDetail',
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  }
})
</script>
