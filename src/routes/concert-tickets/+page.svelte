<script>
  import { PUBLIC_WOMPI_COMMERCE_KEY } from '$env/static/public';
  import { v4 as uuidv4 } from 'uuid'
  import { ticketsOptions } from '$lib/concert-tickets';
  
  let colombiaNumberFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', currencyDisplay: 'code',  minimumFractionDigits: 0});
  let currentPriceInCents;
  let currentPaymentReference = uuidv4();
  let currency = "COP";
</script>

<form action="https://checkout.wompi.co/p/" method="GET">
  <select bind:value={currentPriceInCents} name="ticketQuantity" id="ticketQuantity" required>
      <option value="" selected>Selecciona la cantidad de boletas</option>
      {#each Object.entries(ticketsOptions) as [ticketOptionName, ticketOptionObject]}
          <option value={ticketOptionObject.price()*100}>{ticketOptionObject.quantity} ({colombiaNumberFormat.format(ticketOptionObject.price())})</option>
      {/each}
  </select>

  <input type="hidden" name="public-key" value="{PUBLIC_WOMPI_COMMERCE_KEY}" />
  <input type="hidden" name="currency" value={currency} />
  <input type="hidden" name="amount-in-cents" value="{currentPriceInCents}" />
  <input type="hidden" name="reference" value="{currentPaymentReference}" />

  <!--
    TO DO
    <input type="hidden" name="signature:integrity" value={}/>
    <input type="hidden" name="redirect-url" value="URL_REDIRECCION" />
  -->
  <input type="hidden" name="customer-data:email" value="" />
  <input type="hidden" name="customer-data:full-name" value="" />
  <input type="hidden" name="customer-data:phone-number" value="" />
  <button type="submit">Pagar con Wompi</button>
</form>