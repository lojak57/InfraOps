<div class="quick-actions-bottom">
  <button class="quick-action dispatch">DISPATCH</button>
  <button class="quick-action safety">SAFETY ALERT</button>
  <button class="quick-action emergency">EMERGENCY</button>
</div>

<style>
  .quick-actions-bottom {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 24px;
  }
  
  .quick-action {
    background: #374151;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .quick-action:hover {
    background: #4b5563;
  }
  
  .quick-action.emergency {
    background: #dc2626;
  }
  
  .quick-action.emergency:hover {
    background: #b91c1c;
  }
</style> 