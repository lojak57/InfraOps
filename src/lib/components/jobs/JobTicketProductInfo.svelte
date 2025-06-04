<script lang="ts">
  import { Gauge } from 'lucide-svelte';
  import type { ProductInfo } from './job-ticket.types';

  export let productInfo: ProductInfo;
</script>

<section class="info-section">
  <h2><Gauge size={18} /> Product Information</h2>
  <div class="product-grid">
    <div class="detail-card">
      <h3>Product Specifications</h3>
      <div class="detail-grid">
        <div class="detail-item">
          <label>Product Type</label>
          <span>{productInfo.type}</span>
        </div>
        <div class="detail-item">
          <label>Grade</label>
          <span>{productInfo.grade}</span>
        </div>
        <div class="detail-item">
          <label>API Gravity</label>
          <span>{productInfo.apiGravity}°</span>
        </div>
        <div class="detail-item">
          <label>Sulfur Content</label>
          <span>{productInfo.sulfurContent}%</span>
        </div>
        <div class="detail-item">
          <label>Viscosity</label>
          <span>{productInfo.viscosity}</span>
        </div>
        <div class="detail-item">
          <label>Flash Point</label>
          <span>{productInfo.flashPoint}</span>
        </div>
        <div class="detail-item">
          <label>Pour Point</label>
          <span>{productInfo.pourPoint}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .info-section {
    background: rgba(248, 250, 252, 0.8);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
  }

  .info-section h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }

  .product-grid {
    display: grid;
    gap: 20px;
  }

  .detail-card {
    background: white;
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .detail-card h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #334155;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-item span {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .detail-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 